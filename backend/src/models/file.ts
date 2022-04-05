// File/Upload
export interface FileUploadReq{
    docName: string;
    docType: "id01" | "id02" | "dl01" | "dl02" | "av01";
    docContent: string;
}
