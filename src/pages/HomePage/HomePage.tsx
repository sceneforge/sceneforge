import { useCallback, useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Grid } from "../../components/Grid";
import { SafeArea } from "../../components/SafeArea";

import { fileOpen } from 'browser-fs-access';
import { IconOpenFile } from "../../components/Icon";

export const HomePage = () => {
  const [recentFiles, setRecentFiles] = useState<File[]>([]);

  const handleImportModel = useCallback(() => {
    fileOpen({
      description: 'Select a 3D model',
      mimeTypes: ['model/gltf-binary', 'model/gltf+json'],
      extensions: ['.glb', '.gltf'],
      multiple: false,
      excludeAcceptAllOption: true,
    }).then((file) => {
      setRecentFiles((prev) => [file, ...prev]);
    }).catch((err) => {
      console.error(err);
    });
  }, [setRecentFiles]);

  return (
    <SafeArea>
      <Grid cols={4}>
        <Card title="Open File">
          <Button clear>
            <IconOpenFile />
          </Button>
        </Card>
        <Card title="Import Model">
          <Button clear onClick={handleImportModel}>
            <IconOpenFile />
          </Button>
        </Card>
      </Grid>
      <section>
        <h2>Recent Files</h2>
        <Grid cols={4}>
          {recentFiles.map((file, index) => (
            <Card key={index} title={file.name}>
              <p>File size: {file.size} bytes</p>
              <p>Last modified: {new Date(file.lastModified * 1000).toLocaleString()}</p>
            </Card>
          ))}
        </Grid>
      </section>
    </SafeArea>
  );
}