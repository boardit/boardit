import streamSaver from "streamsaver";
import {WritableStream} from "./ponyfill/ponyfill";

export default function save(filename: string, content: string) {
    let text = new TextEncoder().encode(content);
    streamSaver.WritableStream = WritableStream;
    let fileStream = streamSaver.createWriteStream(filename, {
        size: text.byteLength,
        writableStrategy: undefined,
        readableStrategy: undefined
    });
    const writer = fileStream.getWriter();
    writer.write(text);
    writer.close();
}