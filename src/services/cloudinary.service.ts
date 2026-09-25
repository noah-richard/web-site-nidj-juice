/* ==========================================================================
   NIDJ JUICE — CLOUDINARY MEDIA UPLOAD & CDN SERVICE
   Direct unsigned client-side uploads for images (bottles, gallery) and
   videos (reels), with real-time upload progress tracking and CDN delivery.
   ========================================================================== */

import { cmsService } from './cms.service';

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  folder?: string;
}

export interface CloudinaryUploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  format: string;
  resourceType: 'image' | 'video' | 'raw';
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
}

export interface CloudinaryUploadOptions {
  resourceType?: 'image' | 'video' | 'auto';
  folder?: string;
  onProgress?: (percent: number) => void;
}

class CloudinaryService {
  private static instance: CloudinaryService | null = null;
  private readonly STORAGE_CONFIG_KEY = 'nidj_cloudinary_config';

  private constructor() {}

  public static getInstance(): CloudinaryService {
    if (!CloudinaryService.instance) {
      CloudinaryService.instance = new CloudinaryService();
    }
    return CloudinaryService.instance;
  }

  /**
   * Retrieves current Cloudinary configuration from CMS settings,
   * localStorage, or Vite environment variables.
   */
  public getConfig(): CloudinaryConfig {
    const settings = cmsService.getSettings();

    // 1. Check CMS settings
    let cloudName = settings.cloudinaryCloudName?.trim() || '';
    let uploadPreset = settings.cloudinaryUploadPreset?.trim() || '';
    let folder = settings.cloudinaryFolder?.trim() || 'nidj_juice';

    // 2. Check localStorage fallback
    if (!cloudName || !uploadPreset) {
      try {
        const cached = localStorage.getItem(this.STORAGE_CONFIG_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          cloudName = cloudName || parsed.cloudName || '';
          uploadPreset = uploadPreset || parsed.uploadPreset || '';
          folder = folder || parsed.folder || 'nidj_juice';
        }
      } catch (err) {
        console.warn('Could not read cached Cloudinary config', err);
      }
    }

    // 3. Check Vite env variables
    if (!cloudName) {
      cloudName = (import.meta as any).env?.VITE_CLOUDINARY_CLOUD_NAME || '';
    }
    if (!uploadPreset) {
      uploadPreset = (import.meta as any).env?.VITE_CLOUDINARY_UPLOAD_PRESET || '';
    }

    return { cloudName, uploadPreset, folder };
  }

  /**
   * Updates and persists Cloudinary configuration to CMS settings.
   */
  public saveConfig(config: CloudinaryConfig): void {
    try {
      localStorage.setItem(this.STORAGE_CONFIG_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('Could not write Cloudinary config to localStorage', e);
    }

    const currentSettings = cmsService.getSettings();
    cmsService.saveSettings({
      ...currentSettings,
      cloudinaryCloudName: config.cloudName.trim(),
      cloudinaryUploadPreset: config.uploadPreset.trim(),
      cloudinaryFolder: config.folder?.trim() || 'nidj_juice'
    });
  }

  /**
   * Checks whether Cloudinary credentials are fully populated.
   */
  public isConfigured(): boolean {
    const { cloudName, uploadPreset } = this.getConfig();
    return Boolean(cloudName && uploadPreset);
  }

  /**
   * Uploads an image or video file directly to Cloudinary using unsigned upload.
   */
  public async upload(
    file: File | Blob,
    options: CloudinaryUploadOptions = {}
  ): Promise<CloudinaryUploadResult> {
    const config = this.getConfig();

    if (!config.cloudName || !config.uploadPreset) {
      throw new Error(
        'Cloudinary n\'est pas encore configuré ! Veuillez renseigner votre Cloud Name et votre Upload Preset dans les Paramètres du Backoffice.'
      );
    }

    // Detect resource type if set to auto or undefined
    let resourceType: 'image' | 'video' | 'auto' = options.resourceType || 'auto';
    if (resourceType === 'auto') {
      if (file.type.startsWith('video/')) {
        resourceType = 'video';
      } else {
        resourceType = 'image';
      }
    }

    const uploadUrl = `https://api.cloudinary.com/v1_1/${encodeURIComponent(config.cloudName)}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', config.uploadPreset);

    const targetFolder = options.folder || config.folder;
    if (targetFolder) {
      formData.append('folder', targetFolder);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl, true);

      // Track real-time progress
      if (xhr.upload && options.onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            options.onProgress?.(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve({
              url: data.url,
              secureUrl: data.secure_url || data.url,
              publicId: data.public_id,
              format: data.format,
              resourceType: data.resource_type || (resourceType as any),
              bytes: data.bytes,
              width: data.width,
              height: data.height,
              duration: data.duration
            });
          } catch (err) {
            reject(new Error('Réponse invalide reçue de Cloudinary'));
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            const msg = errorData.error?.message || `Erreur Cloudinary (Code ${xhr.status})`;
            reject(new Error(msg));
          } catch {
            reject(
              new Error(`Échec de l'envoi vers Cloudinary (HTTP ${xhr.status} : ${xhr.statusText})`)
            );
          }
        }
      };

      xhr.onerror = () => {
        reject(
          new Error(
            'Erreur réseau lors de la communication avec Cloudinary. Vérifiez votre connexion internet ou votre configuration CORS.'
          )
        );
      };

      xhr.send(formData);
    });
  }

  /**
   * Quick connection diagnostic: uploads a tiny 1x1 test image
   * to verify that the Cloud Name and Upload Preset are working.
   */
  public async testConnection(): Promise<{ success: boolean; message: string; url?: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        message: 'Cloud Name ou Upload Preset manquant.'
      };
    }

    try {
      // 1x1 transparent PNG data URI converted to blob
      const pixelBase64 =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      const res = await fetch(pixelBase64);
      const blob = await res.blob();
      const testFile = new File([blob], 'nidj_test_ping.png', { type: 'image/png' });

      const result = await this.upload(testFile, {
        resourceType: 'image',
        folder: 'nidj_test'
      });

      return {
        success: true,
        message: `✓ Connexion Cloudinary validée ! Cloud Name : "${this.getConfig().cloudName}".`,
        url: result.secureUrl
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Impossible de se connecter à Cloudinary avec ces paramètres.'
      };
    }
  }
}

export const cloudinaryService = CloudinaryService.getInstance();
