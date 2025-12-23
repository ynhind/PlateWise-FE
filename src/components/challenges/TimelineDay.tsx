import React, { useState, useRef } from "react";
import { ChallengeLog } from "../../types/challenges.type";

interface TimelineDayProps {
  dayNum: number;
  isCompleted: boolean;
  challengeId: string;
  isLast: boolean;
  existingLog?: ChallengeLog;
  onLogProof: (text: string, file: File | null) => void;
}

export const TimelineDay: React.FC<TimelineDayProps> = ({
  dayNum,
  isCompleted,
  existingLog,
  isLast,
  onLogProof,
}) => {
  const [isLogging, setIsLogging] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // 2. Tạo ref để điều khiển input ẩn
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogProof(text, file);
    setIsLogging(false);
    setFile(null); // Reset file sau khi submit
    setText("");
  };

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex gap-6 mb-8 relative group">
      {!isLast && (
        <div className="absolute left-[20px] top-10 bottom-[-32px] w-0.5 bg-gray-200 z-0"></div>
      )}

      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 shrink-0 transition-all duration-300 ${
          isCompleted
            ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-emerald-200"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {isCompleted ? "✓" : dayNum}
      </div>

      <div className="flex-grow bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-100 transition-colors">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-gray-800 m-0">Day {dayNum}</h4>
          {isCompleted && (
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-green-100 text-green-700">
              Completed
            </span>
          )}
        </div>

        {isCompleted ? (
          <div>
            <p className="text-gray-600">{existingLog?.proofText}</p>
            {existingLog?.proofImageUrl && (
              <img
                src={existingLog.proofImageUrl}
                alt="Proof"
                className="w-full rounded-xl mt-3 object-cover max-h-60"
              />
            )}
          </div>
        ) : !isLogging ? (
          <button
            className="text-emerald-600 font-semibold border-2 border-emerald-600 px-4 py-2 rounded-full text-sm hover:bg-emerald-50 transition-colors"
            onClick={() => setIsLogging(true)}
          >
            Log Proof
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
              placeholder="How did it go?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />

            <div className="flex items-center gap-3">
              {/* Input thật bị ẩn đi */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              {/* Nút giả để bấm */}
              <button
                type="button"
                onClick={handlePickFile}
                className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-full hover:bg-emerald-100 transition-colors"
              >
                Choose File
              </button>

              {/* Hiển thị tên file hoặc thông báo chưa chọn */}
              <span className="text-sm text-gray-500 italic truncate max-w-[200px]">
                {file ? file.name : "No file chosen"}
              </span>
            </div>
            {/* --- KẾT THÚC PHẦN CUSTOM FILE INPUT --- */}

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-full font-bold hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all"
              >
                Submit
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-transparent text-gray-500 border border-gray-300 text-sm rounded-full font-semibold hover:bg-gray-50 transition-colors"
                onClick={() => setIsLogging(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
