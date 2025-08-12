import { useEffect, useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { $typst } from "@myriaddreamin/typst.ts";
import { TypstDocument } from "@myriaddreamin/typst.react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

$typst.setCompilerInitOptions({
  getModule: () => "/typst_ts_web_compiler_bg.wasm",
});
$typst.setRendererInitOptions({
  getModule: () => "/typst_ts_renderer_bg.wasm",
});
TypstDocument.setWasmModuleInitOptions({
  getModule: () => "/typst_ts_renderer_bg.wasm",
  beforeBuild: [],
});

function Codemirror() {
  const [code, setCode] = useState("");
  const [vector, setVector] = useState<Uint8Array | null>(null);

  // For resizable panes, keyboard accessible divider, etc. (omitted here for brevity)

  // --- Dialog state ---
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("document.pdf");
  const [downloadInProgress, setDownloadInProgress] = useState(false);
  // Listen for Ctrl+S / Cmd+S
  useEffect(() => {
    const handler = (e: {
      ctrlKey: any;
      metaKey: any;
      key: string;
      preventDefault: () => void;
    }) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setDialogOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!code) {
      setVector(null);
      return;
    }
    let isCancelled = false;
    async function fetchVector() {
      try {
        const result = await $typst.vector({ mainContent: code });
        if (!isCancelled) setVector(result ?? new Uint8Array());
      } catch (error) {
        console.error("Failed to generate vector:", error);
      }
    }
    fetchVector();
    return () => {
      isCancelled = true;
    };
  }, [code]);

  // New: download PDF with given filename
  const downloadPdf = useCallback(async () => {
    if (!fileName.trim()) {
      alert("Please enter a valid file name.");
      return;
    }

    setDownloadInProgress(true);
    try {
      const pdfData = await $typst.pdf({ mainContent: code });
      const pdfBlob = new Blob([pdfData ?? new Blob()], {
        type: "application/pdf",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.target = "_blank";

      // Ensure filename ends with .pdf
      const normalizedFileName = fileName.toLowerCase().endsWith(".pdf")
        ? fileName
        : fileName + ".pdf";

      link.download = normalizedFileName;
      link.click();
      URL.revokeObjectURL(link.href);

      setDialogOpen(false); // close dialog after download
    } catch (error) {
      console.error("Failed to download PDF:", error);
      alert("An error occurred while downloading the PDF.");
    } finally {
      setDownloadInProgress(false);
    }
  }, [code, fileName]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Toolbar */}
      <header className="flex items-center justify-between px-6 py-3 bg-white shadow-md border-b border-gray-200">
        <h1 className="text-xl font-semibold">Typst Editor</h1>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => setDialogOpen(true)}
            className="whitespace-nowrap"
          >
            Download PDF
          </Button>
          {/* Dialog for filename input and download */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              {/* Hidden trigger because we're controlling open state manually */}
              <></>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Download PDF</DialogTitle>
                <DialogDescription>
                  Enter a file name for the PDF download.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                <Label htmlFor="fileName" className="mb-1 block font-medium">
                  File Name
                </Label>
                <Input
                  id="fileName"
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  autoFocus
                  onFocus={(e) => e.target.select()}
                  className="text-lg px-3 py-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // prevent form submission or dialog close
                      if (fileName.trim().length > 0 && !downloadInProgress) {
                        downloadPdf(); // your download handler
                      }
                    }
                  }}
                />
              </div>

              <DialogFooter className="mt-6 flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={downloadInProgress}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  onClick={downloadPdf}
                  disabled={downloadInProgress}
                >
                  {downloadInProgress ? "Downloading..." : "Download"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* The rest of your editor and preview panes remain unchanged */}

      {/* Example stub for editor/preview layout — replace with your current implementation */}
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden border-t border-gray-200">
        {/* Editor and preview here */}
        <section className="w-full md:w-1/2 p-4 bg-white shadow-inner overflow-auto">
          <CodeMirror
            placeholder="Start Writing"
            value={code}
            height="100%"
            className="h-full rounded-md border border-gray-300"
            onChange={(value) => setCode(value)}
          />
        </section>
        <section className="w-full md:w-1/2 p-4 bg-white shadow-inner overflow-auto border-t md:border-t-0 md:border-l border-gray-200 flex-grow">
          {vector ? (
            <TypstDocument artifact={vector} />
          ) : (
            <div className="text-center text-gray-500 mt-20">
              Start typing to see preview
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Codemirror;
