type UploadedFilesListProps = {
  images: File[];
  videos: File[];
  onRemoveImage: (index: number) => void;
  onRemoveVideo: (index: number) => void;
};
function FileItem({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) {
  return (
    <span
      onClick={onRemove}
      className="cursor-pointer hover:opacity-70"
    >
      {file.name} <span className="text-[20px] leading-0">⨯</span>
    </span>
  );
}
export default function UploadedFilesList({
  images,
  videos,
  onRemoveImage,
  onRemoveVideo,
}: UploadedFilesListProps) {
  return (
    <div className="flex flex-col text-accent gap-[4px]">
      {images.map((file, index) => (
        <FileItem
          key={`img-${index}`}
          file={file}
          onRemove={() => onRemoveImage(index)}
        />
      ))}

      {videos.map((file, index) => (
        <FileItem
          key={`vid-${index}`}
          file={file}
          onRemove={() => onRemoveVideo(index)}
        />
      ))}
    </div>
  );
}