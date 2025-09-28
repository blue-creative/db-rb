import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import UploadModule from "@/components/modules/UploadModule";
import SpotifyModule from "@/components/modules/SpotifyModule";
import MetadataModule from "@/components/modules/MetadataModule";

const Index = () => {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upload">Upload & Dedupe</TabsTrigger>
            <TabsTrigger value="spotify">Spotify Compare</TabsTrigger>
            <TabsTrigger value="metadata">Metadata Editor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <UploadModule />
          </TabsContent>
          
          <TabsContent value="spotify">
            <SpotifyModule />
          </TabsContent>
          
          <TabsContent value="metadata">
            <MetadataModule />
          </TabsContent>
        </Tabs>
      </main>
      
      <AppFooter />
    </div>
  );
};

export default Index;
