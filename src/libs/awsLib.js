import { Storage } from "aws-amplify";

export async function s3Upload(file){
    const filename = `${Date.now()}-${file.name}`;

    // use Storage.vault to make sure that the file
    // is uploaded to the user's folder
    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type
    });

    return stored.key;
}