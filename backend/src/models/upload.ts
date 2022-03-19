// Upload/Document
export interface UploadDocumentReq{
    docName: string;
    docType: "id01" | "id02" | "dl01" | "dl02";
    docContent: string;
}
