import { useState } from "react";
import { Upload, FileText, Music, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TrackPreview {
  id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  key: string;
  status: "new" | "existing";
}

const UploadModule = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewData, setPreviewData] = useState<TrackPreview[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const supportedTypes = ['.xml', '.txt', '.json', '.m3u', '.m3u8'];
    const validFiles = files.filter(file => 
      supportedTypes.some(type => file.name.toLowerCase().endsWith(type))
    );
    
    setUploadedFiles(validFiles);
    
    // Mock preview data
    const mockData: TrackPreview[] = [
      { id: "1", title: "Track One", artist: "Artist A", genre: "House", bpm: 128, key: "Am", status: "new" },
      { id: "2", title: "Track Two", artist: "Artist B", genre: "Techno", bpm: 132, key: "Gm", status: "existing" },
      { id: "3", title: "Track Three", artist: "Artist C", genre: "Progressive", bpm: 126, key: "Cm", status: "new" },
    ];
    setPreviewData(mockData);
  };

  const getStatusBadge = (status: "new" | "existing") => {
    return (
      <Badge 
        variant={status === "new" ? "default" : "secondary"}
        className={status === "new" ? "bg-status-new text-white" : "bg-status-existing text-white"}
      >
        {status === "new" ? "New" : "Existing"}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload & Dedupe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver 
                ? "border-primary bg-primary/10" 
                : "border-border hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4">
              <Database className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">Drop files here or click to upload</h3>
                <p className="text-muted-foreground">
                  Supports XML, TXT, JSON, M3U, M3U8 files
                </p>
              </div>
              <Button asChild>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept=".xml,.txt,.json,.m3u,.m3u8"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  Choose Files
                </label>
              </Button>
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Uploaded Files:</h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {previewData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Preview Results ({previewData.length} tracks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>BPM</TableHead>
                    <TableHead>Key</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((track) => (
                    <TableRow key={track.id}>
                      <TableCell>{getStatusBadge(track.status)}</TableCell>
                      <TableCell className="font-medium">{track.title}</TableCell>
                      <TableCell>{track.artist}</TableCell>
                      <TableCell>{track.genre}</TableCell>
                      <TableCell>{track.bpm}</TableCell>
                      <TableCell>{track.key}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button>Save to Database</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadModule;