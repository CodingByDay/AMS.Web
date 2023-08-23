/**
* DevExtreme (file_management/upload_info.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * An object that provides information about the file upload session.
 */
export default interface UploadInfo {
    /**
     * The number of bytes that is uploaded to the server.
     */
    bytesUploaded: number;

    /**
     * The number of uploaded chunks and chunks that are to be uploaded.
     */
    chunkCount: number;

    /**
     * Information saved during the file upload.
     */
    customData: any;

    /**
     * The binary content of the uploading chunk.
     */
    chunkBlob: Blob;

    /**
     * The index of the uploading chunk.
     */
    chunkIndex: number;
}
