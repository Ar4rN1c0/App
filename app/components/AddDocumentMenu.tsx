"use client"
import style from "./messagesDisplay.module.css"
import * as pdfjs from "pdfjs-dist/build/pdf.mjs";
import "pdfjs-dist/build/pdf.worker.mjs";

interface State {
    pdfText: string;
    setPdfText: (value: string) => void;
}

export default function AddDocumentMenu({ state }: { state: State }) {
    const { pdfText, setPdfText } = state
    const extractTextFromPDF = async (file: File) => {
        try {
            const pdf = await pdfjs.getDocument(await file.arrayBuffer()).promise;
            let text = "";
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageText = content.items.map((item: any) => item.str).join(" ");
                text += ` ${pageText}`;
            }
            setPdfText(text.trim());
        } catch (error) {
            console.error("Failed to extract text from PDF", error);
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === "application/pdf") {
            await extractTextFromPDF(file);
        } else {
            console.warn("Please select a PDF file.");
        }
    };
    return (
        <div>
            <h2>Add Document</h2>
            <form action="/api/upload" method="POST" encType="multipart/form-data">
                <input onChange={handleFileChange} type="file" name="file" />
            </form>
        </div>
    )
}