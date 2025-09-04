
"use client";

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Eye, Trash2, Download } from 'lucide-react';
import type { Document } from '@/lib/types';

export function DocumentManager({ initialDocuments }: { initialDocuments: Document[] }) {
  const [documents, setDocuments] = React.useState<Document[]>(initialDocuments);
  const [isUploadDialogOpen, setUploadDialogOpen] = React.useState(false);
  const [newDocument, setNewDocument] = React.useState({ name: '', type: 'Other' as Document['type'] });

  const handleUpload = () => {
    // In a real app, this would handle the file upload to a server/storage
    // and then update the state with the new document's details.
    const newDoc: Document = {
      id: `d${documents.length + 1}`,
      name: newDocument.name || 'Untitled Document',
      type: newDocument.type,
      uploadDate: new Date().toISOString().split('T')[0],
      fileUrl: '#', // Placeholder URL
    };
    setDocuments([...documents, newDoc]);
    setUploadDialogOpen(false);
    setNewDocument({ name: '', type: 'Other' });
  };
  
  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  }

  const typeVariantMap: Record<Document['type'], 'default' | 'secondary' | 'outline'> = {
    'ID': 'default',
    'Transcript': 'secondary',
    'Essay': 'outline',
    'Other': 'secondary'
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Upload className="mr-2" /> Upload Document
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>
                   <Badge variant={typeVariantMap[doc.type]}>{doc.type}</Badge>
                </TableCell>
                <TableCell>{doc.uploadDate}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(doc.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isUploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New Document</DialogTitle>
            <DialogDescription>
              Select a file from your device and categorize it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doc-name" className="text-right">Name</Label>
              <Input id="doc-name" value={newDocument.name} onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })} className="col-span-3" placeholder="e.g. My ID Card" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doc-type" className="text-right">Type</Label>
                <Select
                    value={newDocument.type}
                    onValueChange={(value) => setNewDocument({ ...newDocument, type: value as Document['type'] })}
                >
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ID">ID Document</SelectItem>
                        <SelectItem value="Transcript">Transcript</SelectItem>
                        <SelectItem value="Essay">Essay / Motivation</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doc-file" className="text-right">File</Label>
              <Input id="doc-file" type="file" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
