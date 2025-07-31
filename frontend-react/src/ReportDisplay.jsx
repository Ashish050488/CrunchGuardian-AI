import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
export default function ReportDisplay({ report }) { 
  if (!report) return null; 
  return (
    <div className="prose prose-invert max-w-none bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
    </div>
  );
}