import { FC } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { usePreviewPdfHooks } from './hooks';
import { useResizeDetector } from 'react-resize-detector';
import Spinner from '@/components/LoadingPage/Spinner';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

type Props = {
  currentPageNumber: number;
};

const PreviewPdf: FC<Props> = ({ currentPageNumber }) => {
  const { width, ref } = useResizeDetector();
  const { currentFilePolicyUrl, isLoadingFile, numPages, pageRefs, onDocumentLoadSuccess } = usePreviewPdfHooks({
    currentPageNumber,
  });

  return (
    <div ref={ref} className="no-scrollbar relative flex h-full flex-1 overflow-y-scroll">
      {currentFilePolicyUrl && (
        <Document
          loading={
            <div className=" absolute inset-0  h-full w-full">
              <Spinner />
            </div>
          }
          file={currentFilePolicyUrl}
          options={options}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {isLoadingFile
            ? null
            : Array.from(new Array(numPages), (_page, index) => (
                <div
                  key={`page_${index + 1}`}
                  ref={(el) => {
                    pageRefs.current[index + 1] = el;
                  }}
                >
                  <Page loading={undefined} key={`page_${index + 1}`} pageNumber={index + 1} width={width} />
                </div>
              ))}
        </Document>
      )}
    </div>
  );
};

export default PreviewPdf;
