import { useState } from "react";
import { Edit, Save, History, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Track {
  id: string;
  fileType: string;
  key: string;
  bpm: number;
  time: string;
  playCount: number;
  title: string;
  artist: string;
  genre: string;
  remixer: string;
  rating: number;
  mixName: string;
  myTag: string;
  comments: string;
  composer: string;
  lyricist: string;
  year: number;
  dateAdded: string;
  fileName: string;
  location: string;
}

interface AuditLog {
  id: string;
  trackId: string;
  field: string;
  oldValue: string;
  newValue: string;
  timestamp: string;
  user: string;
}

const MetadataModule = () => {
  const [editingCell, setEditingCell] = useState<{ trackId: string; field: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAuditLog, setShowAuditLog] = useState(false);

  // Mock data
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: "1",
      fileType: "MP3",
      key: "Am",
      bpm: 128,
      time: "5:23",
      playCount: 15,
      title: "Deep House Anthem",
      artist: "Artist One",
      genre: "Deep House",
      remixer: "",
      rating: 5,
      mixName: "Club Mix",
      myTag: "Peak Time",
      comments: "Great for opening",
      composer: "Artist One",
      lyricist: "",
      year: 2024,
      dateAdded: "2024-01-15",
      fileName: "deep_house_anthem.mp3",
      location: "/Music/Deep House/"
    },
    {
      id: "2",
      fileType: "FLAC",
      key: "Gm",
      bpm: 132,
      time: "6:45",
      playCount: 8,
      title: "Techno Revolution",
      artist: "Artist Two",
      genre: "Techno",
      remixer: "Remix Artist",
      rating: 4,
      mixName: "Extended Mix",
      myTag: "Main Set",
      comments: "High energy",
      composer: "Artist Two",
      lyricist: "",
      year: 2023,
      dateAdded: "2024-01-10",
      fileName: "techno_revolution_remix.flac",
      location: "/Music/Techno/"
    }
  ]);

  const auditLogs: AuditLog[] = [
    {
      id: "1",
      trackId: "1",
      field: "rating",
      oldValue: "4",
      newValue: "5",
      timestamp: "2024-01-15 14:30:00",
      user: "admin"
    },
    {
      id: "2",
      trackId: "2",
      field: "myTag",
      oldValue: "Warm Up",
      newValue: "Main Set",
      timestamp: "2024-01-15 14:25:00",
      user: "admin"
    }
  ];

  const handleCellClick = (trackId: string, field: string) => {
    setEditingCell({ trackId, field });
  };

  const handleCellSave = (trackId: string, field: string, value: any) => {
    setTracks(tracks.map(track => 
      track.id === trackId 
        ? { ...track, [field]: value }
        : track
    ));
    setEditingCell(null);
  };

  const EditableCell = ({ track, field, value }: { track: Track; field: string; value: any }) => {
    const isEditing = editingCell?.trackId === track.id && editingCell?.field === field;
    const [editValue, setEditValue] = useState(value?.toString() || "");

    if (isEditing) {
      return (
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => handleCellSave(track.id, field, field === 'bpm' || field === 'year' || field === 'rating' || field === 'playCount' ? Number(editValue) : editValue)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCellSave(track.id, field, field === 'bpm' || field === 'year' || field === 'rating' || field === 'playCount' ? Number(editValue) : editValue);
            }
            if (e.key === 'Escape') {
              setEditingCell(null);
            }
          }}
          className="h-8"
          autoFocus
        />
      );
    }

    return (
      <div 
        className="cursor-pointer hover:bg-muted/50 p-1 rounded min-h-[2rem] flex items-center"
        onClick={() => handleCellClick(track.id, field)}
      >
        {field === 'rating' ? (
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < value ? "text-yellow-400" : "text-muted-foreground"}>
                ★
              </span>
            ))}
          </div>
        ) : (
          <span>{value?.toString() || "-"}</span>
        )}
      </div>
    );
  };

  const filteredTracks = tracks.filter(track => 
    Object.values(track).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Metadata Editor
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAuditLog(!showAuditLog)}
              >
                <History className="h-4 w-4 mr-2" />
                Audit Log
              </Button>
              <Badge variant="secondary">{tracks.length} tracks</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tracks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-auto max-h-[600px] border rounded">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead className="w-16">Type</TableHead>
                  <TableHead className="w-16">Key</TableHead>
                  <TableHead className="w-16">BPM</TableHead>
                  <TableHead className="w-20">Time</TableHead>
                  <TableHead className="w-20">Plays</TableHead>
                  <TableHead className="min-w-[200px]">Title</TableHead>
                  <TableHead className="min-w-[150px]">Artist</TableHead>
                  <TableHead className="w-32">Genre</TableHead>
                  <TableHead className="w-32">Remixer</TableHead>
                  <TableHead className="w-24">Rating</TableHead>
                  <TableHead className="w-32">Mix Name</TableHead>
                  <TableHead className="w-32">My Tag</TableHead>
                  <TableHead className="min-w-[200px]">Comments</TableHead>
                  <TableHead className="w-32">Composer</TableHead>
                  <TableHead className="w-32">Lyricist</TableHead>
                  <TableHead className="w-20">Year</TableHead>
                  <TableHead className="w-32">Date Added</TableHead>
                  <TableHead className="min-w-[200px]">File Name</TableHead>
                  <TableHead className="min-w-[200px]">Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTracks.map((track) => (
                  <TableRow key={track.id}>
                    <TableCell><EditableCell track={track} field="fileType" value={track.fileType} /></TableCell>
                    <TableCell><EditableCell track={track} field="key" value={track.key} /></TableCell>
                    <TableCell><EditableCell track={track} field="bpm" value={track.bpm} /></TableCell>
                    <TableCell><EditableCell track={track} field="time" value={track.time} /></TableCell>
                    <TableCell><EditableCell track={track} field="playCount" value={track.playCount} /></TableCell>
                    <TableCell><EditableCell track={track} field="title" value={track.title} /></TableCell>
                    <TableCell><EditableCell track={track} field="artist" value={track.artist} /></TableCell>
                    <TableCell><EditableCell track={track} field="genre" value={track.genre} /></TableCell>
                    <TableCell><EditableCell track={track} field="remixer" value={track.remixer} /></TableCell>
                    <TableCell><EditableCell track={track} field="rating" value={track.rating} /></TableCell>
                    <TableCell><EditableCell track={track} field="mixName" value={track.mixName} /></TableCell>
                    <TableCell><EditableCell track={track} field="myTag" value={track.myTag} /></TableCell>
                    <TableCell><EditableCell track={track} field="comments" value={track.comments} /></TableCell>
                    <TableCell><EditableCell track={track} field="composer" value={track.composer} /></TableCell>
                    <TableCell><EditableCell track={track} field="lyricist" value={track.lyricist} /></TableCell>
                    <TableCell><EditableCell track={track} field="year" value={track.year} /></TableCell>
                    <TableCell><EditableCell track={track} field="dateAdded" value={track.dateAdded} /></TableCell>
                    <TableCell><EditableCell track={track} field="fileName" value={track.fileName} /></TableCell>
                    <TableCell><EditableCell track={track} field="location" value={track.location} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {showAuditLog && (
        <Card>
          <CardHeader>
            <CardTitle>Audit Log</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Old Value</TableHead>
                  <TableHead>New Value</TableHead>
                  <TableHead>User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm">{log.timestamp}</TableCell>
                    <TableCell>{log.trackId}</TableCell>
                    <TableCell className="font-medium">{log.field}</TableCell>
                    <TableCell className="text-muted-foreground">{log.oldValue}</TableCell>
                    <TableCell className="text-primary">{log.newValue}</TableCell>
                    <TableCell>{log.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MetadataModule;