import { useState } from "react";
import { Music, ExternalLink, Check, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SpotifyPlaylist {
  id: string;
  name: string;
  trackCount: number;
}

interface ComparisonResult {
  id: string;
  title: string;
  artist: string;
  status: "found" | "duplicate" | "missing";
  spotifyUrl?: string;
  localMatches?: number;
}

const SpotifyModule = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);

  // Mock data
  const mockPlaylists: SpotifyPlaylist[] = [
    { id: "1", name: "House Classics", trackCount: 45 },
    { id: "2", name: "Techno Mix 2024", trackCount: 32 },
    { id: "3", name: "Progressive Journey", trackCount: 28 },
  ];

  const mockResults: ComparisonResult[] = [
    { id: "1", title: "Track One", artist: "Artist A", status: "found", spotifyUrl: "#", localMatches: 1 },
    { id: "2", title: "Track Two", artist: "Artist B", status: "duplicate", spotifyUrl: "#", localMatches: 3 },
    { id: "3", title: "Missing Track", artist: "Artist C", status: "missing" },
  ];

  const handleSpotifyLogin = () => {
    // Mock login
    setIsConnected(true);
  };

  const handleCompare = () => {
    if (selectedPlaylist) {
      setComparisonResults(mockResults);
    }
  };

  const getStatusIcon = (status: ComparisonResult["status"]) => {
    switch (status) {
      case "found":
        return <Check className="h-4 w-4 text-status-new" />;
      case "duplicate":
        return <AlertCircle className="h-4 w-4 text-status-duplicate" />;
      case "missing":
        return <X className="h-4 w-4 text-status-missing" />;
    }
  };

  const getStatusBadge = (status: ComparisonResult["status"]) => {
    const colors = {
      found: "bg-status-new",
      duplicate: "bg-status-duplicate", 
      missing: "bg-status-missing"
    };
    
    return (
      <Badge className={`${colors[status]} text-white`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Spotify Compare
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="text-center py-8">
              <div className="space-y-4">
                <div className="text-6xl">🎵</div>
                <h3 className="text-lg font-semibold">Connect to Spotify</h3>
                <p className="text-muted-foreground">
                  Login to compare your Spotify playlists with your local music database
                </p>
                <Button onClick={handleSpotifyLogin} className="bg-[#1DB954] hover:bg-[#1ed760] text-white">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Login with Spotify
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-status-new rounded-full"></div>
                  <span className="text-sm">Connected to Spotify</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsConnected(false)}>
                  Disconnect
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Playlist</label>
                  <Select value={selectedPlaylist} onValueChange={setSelectedPlaylist}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a playlist..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPlaylists.map((playlist) => (
                        <SelectItem key={playlist.id} value={playlist.id}>
                          {playlist.name} ({playlist.trackCount} tracks)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleCompare} 
                    disabled={!selectedPlaylist}
                    className="w-full"
                  >
                    Compare with Database
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {comparisonResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Local Matches</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(result.status)}
                          {getStatusBadge(result.status)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{result.title}</TableCell>
                      <TableCell>{result.artist}</TableCell>
                      <TableCell>
                        {result.localMatches ? (
                          <span className="text-sm">{result.localMatches} match(es)</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {result.spotifyUrl && (
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View in Spotify
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpotifyModule;