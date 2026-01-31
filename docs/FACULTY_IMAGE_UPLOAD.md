# Faculty Image Upload Feature

## Overview
Faculty members can now have their images uploaded directly to the server or use external links (Google Drive, etc.).

## Features

### 1. **Image Upload**
- Upload images directly through the admin panel
- Images are saved to `public/images/faculty/` folder
- Automatic filename generation: `{faculty-slug}-{timestamp}.{ext}`
- Path stored in database: `/images/faculty/filename.jpg`

### 2. **External URL Support (Backward Compatible)**
- Users can still provide external image links
- Google Drive links are automatically converted to thumbnail format
- External URLs are stored as-is in the database

### 3. **Toggle Between Upload and URL**
- "Upload Image" button switches to file upload mode
- "Use URL Instead" button switches back to URL input
- Preview shown for both upload and URL modes

## File Structure

```
public/
  images/
    faculty/           # Faculty images stored here
      john-doe-1738123456.jpg
      jane-smith-1738123789.png
```

## Database Storage

### Uploaded Images
```
photoUrl: "/images/faculty/john-doe-1738123456.jpg"
```

### External Links
```
photoUrl: "https://drive.google.com/thumbnail?id=abc123&sz=w160"
```

## Usage

### Admin Panel - Create New Faculty

1. Navigate to **Admin → Faculty → Add New**
2. Fill in basic information
3. In the "Faculty Photo" section:
   - **Option A: Upload Image**
     - Click "Upload Image" button
     - Select an image file from your computer
     - Preview will be shown immediately
   - **Option B: Use External URL**
     - Click "Use URL Instead" (if in upload mode)
     - Paste the image URL (Google Drive, Imgur, etc.)
     - Preview will be shown if URL is valid

### Admin Panel - Edit Faculty

1. Navigate to **Admin → Faculty → [Select Faculty] → Edit**
2. Current image will be shown in preview
3. To change image:
   - Use "Upload Image" to replace with new upload
   - Use "Use URL Instead" to switch to external link

## Image Requirements

### Upload Mode
- **Supported formats**: JPG, JPEG, PNG, GIF, WebP
- **Recommended size**: 400x400px minimum
- **File size**: No strict limit, but keep under 2MB for best performance

### URL Mode
- Must be a publicly accessible URL
- Google Drive links automatically converted to thumbnail format
- Direct image URLs work best

## Technical Implementation

### Form Component
- **File**: `components/faculty-form.tsx`
- Toggle state managed with `useState`
- Image preview using FileReader API
- FormData includes `imageFile` field when uploading

### Server Action
- **File**: `app/actions/faculty.ts`
- `saveImageFile()` helper function:
  - Creates `public/images/faculty/` directory if needed
  - Generates unique filename with slug and timestamp
  - Writes file using Node.js fs/promises
  - Returns public path for database storage

### API Endpoints
- `createFaculty(formData)` - Handles both create with upload or URL
- `updateFaculty(id, formData)` - Handles both update with upload or URL

## Display

### Faculty Card
- **File**: `components/faculty-card.tsx`
- Uses Next.js `Image` component
- Automatically handles both local paths and external URLs
- Falls back to User icon if no photo provided

### Faculty Profile Page
- Images served directly from `public/images/faculty/`
- Next.js automatically optimizes images
- External URLs are also optimized through Next.js Image component

## Migration Notes

### Existing Faculty with External URLs
- No action required
- Existing `photoUrl` values will continue to work
- Can be updated to upload method anytime through edit page

### Existing Faculty without Images
- Can now upload images through edit page
- Preview will show current state (User icon if none)

## Troubleshooting

### Upload Not Working
1. Check folder permissions on `public/images/faculty/`
2. Verify file size is not too large
3. Check browser console for errors

### Images Not Displaying
1. For uploaded images:
   - Verify file exists in `public/images/faculty/`
   - Check database value starts with `/images/faculty/`
2. For external URLs:
   - Verify URL is publicly accessible
   - Check browser network tab for 403/404 errors

### Google Drive Links
- Must be publicly shared
- Automatic conversion to thumbnail format
- Format: `https://drive.google.com/thumbnail?id={fileId}&sz=w160`

## Security Considerations

1. **File Upload**
   - Only image file types accepted
   - Filename sanitization using faculty slug
   - Files stored in public directory (accessible to all)

2. **External URLs**
   - No server-side validation of URL content
   - Google Drive conversion helps with common formats
   - Consider adding URL validation in future updates

## Future Enhancements

- [ ] Image size validation (max file size)
- [ ] Image dimension validation
- [ ] Automatic image compression
- [ ] Crop/resize tool in admin panel
- [ ] Bulk image upload
- [ ] Image CDN integration (Cloudinary, AWS S3)
