// Clipboard utilities
import { toast } from 'react-hot-toast';

export const clipboard = {
  // Copy text to clipboard
  copy(text, successMessage = 'Copied to clipboard!') {
    if (!navigator.clipboard) {
      return this.fallbackCopy(text, successMessage);
    }
    
    return navigator.clipboard.writeText(text)
      .then(() => {
        this.showSuccess(successMessage);
        return true;
      })
      .catch((error) => {
        console.error('Clipboard write failed:', error);
        return this.fallbackCopy(text, successMessage);
      });
  },

  // Fallback method for older browsers
  fallbackCopy(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        this.showSuccess(successMessage);
        return true;
      } else {
        this.showError('Failed to copy text');
        return false;
      }
    } catch (error) {
      console.error('Fallback copy failed:', error);
      document.body.removeChild(textArea);
      this.showError('Copy failed');
      return false;
    }
  },

  // Read from clipboard
  read() {
    if (!navigator.clipboard) {
      return this.fallbackRead();
    }
    
    return navigator.clipboard.readText()
      .then(text => text)
      .catch(error => {
        console.error('Clipboard read failed:', error);
        return this.fallbackRead();
      });
  },

  fallbackRead() {
    const textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    
    textArea.focus();
    
    try {
      const successful = document.execCommand('paste');
      if (successful) {
        const text = textArea.value;
        document.body.removeChild(textArea);
        return text;
      }
    } catch (error) {
      console.error('Fallback read failed:', error);
    }
    
    document.body.removeChild(textArea);
    return '';
  },

  // Download text as file
  download(filename, text, mimeType = 'text/plain') {
    const element = document.createElement('a');
    const file = new Blob([text], { type: mimeType });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    this.showSuccess(`${filename} downloaded successfully!`);
    return true;
  },

  // Download as JSON
  downloadJSON(filename, data) {
    const jsonString = JSON.stringify(data, null, 2);
    return this.download(filename, jsonString, 'application/json');
  },

  // Copy object as JSON
  copyJSON(data, successMessage = 'JSON copied to clipboard!') {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      return this.copy(jsonString, successMessage);
    } catch (error) {
      console.error('JSON copy failed:', error);
      this.showError('Failed to copy JSON');
      return false;
    }
  },

  // Toast notifications
  showSuccess(message) {
    // Using a simple alert for now - you can integrate with your notification system
    if (typeof toast === 'function') {
      toast.success(message);
    } else {
      alert(message);
    }
  },

  showError(message) {
    if (typeof toast === 'function') {
      toast.error(message);
    } else {
      alert(`Error: ${message}`);
    }
  },

  // Utility to format code before copying
  formatCode(code, language = 'lua') {
    const formatters = {
      lua: (code) => {
        // Basic Lua formatting
        return code
          .replace(/\t/g, '  ')
          .replace(/\n\s*\n\s*\n/g, '\n\n')
          .trim();
      },
      json: (code) => {
        try {
          return JSON.stringify(JSON.parse(code), null, 2);
        } catch {
          return code;
        }
      },
      default: (code) => code.trim()
    };
    
    const formatter = formatters[language] || formatters.default;
    return formatter(code);
  },

  // Copy formatted code
  copyFormatted(code, language = 'lua', successMessage = 'Code copied to clipboard!') {
    const formatted = this.formatCode(code, language);
    return this.copy(formatted, successMessage);
  },

  // Check clipboard permissions
  async checkPermissions() {
    if (!navigator.permissions) {
      return { read: false, write: false };
    }
    
    try {
      const readPermission = await navigator.permissions.query({ name: 'clipboard-read' });
      const writePermission = await navigator.permissions.query({ name: 'clipboard-write' });
      
      return {
        read: readPermission.state === 'granted',
        write: writePermission.state === 'granted'
      };
    } catch (error) {
      console.error('Permission check failed:', error);
      return { read: false, write: false };
    }
  },

  // Generate a shareable link
  generateShareLink(data) {
    const encoded = btoa(JSON.stringify(data));
    return `${window.location.origin}/share/${encoded}`;
  },

  // Parse share link
  parseShareLink(encoded) {
    try {
      return JSON.parse(atob(encoded));
    } catch (error) {
      console.error('Failed to parse share link:', error);
      return null;
    }
  },

  // Create a data URL for sharing
  createDataURL(text, mimeType = 'text/plain') {
    return `data:${mimeType};base64,${btoa(text)}`;
  },
};

export default clipboard;