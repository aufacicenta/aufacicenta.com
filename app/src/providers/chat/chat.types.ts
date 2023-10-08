import * as DropboxSign from "@dropbox/sign";
import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/chat";

import { ChatContextMessage } from "context/message/MessageContext.types";

export enum FunctionCallName {
  // Nanonets
  extract_content_from_pdf_file = "extract_content_from_pdf_file",
  // Dropbox
  generate_dropbox_e_signature_request = "generate_dropbox_e_signature_request",
  // Square
  get_square_locations = "get_square_locations",
  get_square_orders = "get_square_orders",
}

export type ChatCompletionChoice = OpenAI.Chat.ChatCompletion.Choice & {
  message: ChatCompletionMessage & Pick<ChatContextMessage, "hasInnerHtml" | "type" | "label" | "readOnly">;
};

export type extract_content_from_pdf_file_args = {
  file_name: string;
};

export type get_square_locations_args = {
  file_name: string;
};

export type generate_dropbox_e_signature_request_args = {
  file_name: string;
  title: DropboxSign.SignatureRequestCreateEmbeddedRequest["title"];
  subject: DropboxSign.SignatureRequestCreateEmbeddedRequest["subject"];
  message: DropboxSign.SignatureRequestCreateEmbeddedRequest["message"];
  signers: string;
};
