import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { $typst } from "@myriaddreamin/typst.ts";
import { TypstDocument } from "@myriaddreamin/typst.react";

$typst.setCompilerInitOptions({
  getModule: () => "/typst_ts_web_compiler_bg.wasm",
});
$typst.setRendererInitOptions({
  getModule: () => "/typst_ts_renderer_bg.wasm",
});

// into vector format
// mainContent = "False";
// const vector1 = await $typst.vector({ mainContent });
let mainContent = " ";
let vector = await $typst.vector({ mainContent });

function Codemirror() {
  const [code, setCode] = useState("");
  const [mainContent, setMainContent] = useState("");

  // const [code1, setCode1] = useState("1");
  const [vec, setVec] = useState(vector);
  // useEffect(() => {
  //   setCode1(code);
  // });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await $typst.vector({ mainContent });
        setVec(result);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
    fetchData();
  }, [mainContent]);

  return (
    <>
      <div className="h-screen flex flex-col" onDoubleClick={() => {}}>
        <main className="flex-grow flex">
          <div className="w-1/2 h-full">
            <CodeMirror
              placeholder="Start Writing"
              value={code}
              height="100%"
              className="h-full"
              onChange={(value) => {
                setCode(value);
                setMainContent(value);
              }}
            />
          </div>
          <div className="w-1/2 h-full overflow-auto">
            <TypstDocument artifact={vec ?? new Uint8Array()} />
          </div>
        </main>
      </div>
    </>
  );
}

export default Codemirror;
