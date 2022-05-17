// File/CarUpload
export interface FileCarUploadReq{
    carId: string;
    docName: string;
    docType: "vl01" | "vl02" | "car01" | "car02" | "car03" | "car04" | "car05" | "car06" | "car07" | "car08" | "car09";
    docContent: string;
    mimeType: string;
}

// File/AvatarUpload
export interface FileAvatarUploadReq{
    docName: string;
    docContent: string;
    mimeType: string;
}


