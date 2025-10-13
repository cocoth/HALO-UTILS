"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FetchGeolocation: () => FetchGeolocation,
  IOF: () => IOF,
  Logger: () => Logger,
  Terminal: () => Terminal,
  TerminalColors: () => TerminalColors,
  Time: () => Time,
  UAParser: () => UAParser,
  collectAnalytics: () => collectAnalytics,
  getLocationFromIP: () => getLocationFromIP,
  mimeType: () => mimeType,
  terminal: () => terminal
});
module.exports = __toCommonJS(index_exports);

// src/files/IOFiles.ts
var crypto = __toESM(require("crypto"));
var path = __toESM(require("path"));
var fs = __toESM(require("fs"));
var import_chokidar = __toESM(require("chokidar"));

// src/files/mimeType.ts
function mimeType(fileName) {
  const ext = fileName.split(".").pop();
  switch (ext) {
    // video
    case "mp4":
      return "video/mp4";
    case "mpeg":
    case "mpg":
    case "mpe":
    case "mpv":
    case "mp2":
    case "m2v":
    case "m2ts":
    case "mts":
    case "tts":
    case "m2t":
    case "tsv":
    case "tsa":
      return "video/mpeg";
    case "webm":
      return "video/webm";
    case "3gp":
      return "video/3gpp";
    case "mkv":
      return "video/x-matroska";
    case "avi":
      return "video/x-msvideo";
    case "mov":
      return "video/quicktime";
    case "wmv":
      return "video/x-ms-wmv";
    case "flv":
      return "video/x-flv";
    case "m4v":
      return "video/x-m4v";
    //  audio
    case "mp3":
      return "audio/mpeg";
    case "m4a":
      return "audio/mp4";
    case "m4b":
    case "m4p":
    case "m4r":
      return "audio/mp4";
    case "wav":
      return "audio/wav";
    case "ogg":
      return "audio/ogg";
    case "aac":
      return "audio/aac";
    case "flac":
      return "audio/flac";
    case "alac":
      return "audio/alac";
    // image
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "bmp":
      return "image/bmp";
    case "webp":
      return "image/webp";
    case "svg":
      return "image/svg+xml";
    case "ico":
      return "image/x-icon";
    case "tiff":
      return "image/tiff";
    case "psd":
      return "image/vnd.adobe.photoshop";
    case "ai":
      return "application/postscript";
    case "eps":
      return "application/postscript";
    case "indd":
      return "application/x-indesign";
    case "raw":
      return "image/x-raw";
    case "cr2":
      return "image/x-canon-cr2";
    case "nef":
      return "image/x-nikon-nef";
    case "orf":
      return "image/x-olympus-orf";
    case "rw2":
      return "image/x-panasonic-rw2";
    case "pef":
      return "image/x-pentax-pef";
    case "arw":
      return "image/x-sony-arw";
    case "dng":
      return "image/x-adobe-dng";
    case "x3f":
      return "image/x-sigma-x3f";
    case "cr3":
      return "image/x-canon-cr3";
    case "heic":
      return "image/heic";
    case "heif":
      return "image/heif";
    case "avif":
      return "image/avif";
    // application
    case "pdf":
      return "application/pdf";
    case "txt":
      return "text/plain";
    // text
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "application/javascript";
    case "json":
      return "application/json";
    case "xml":
      return "application/xml";
    // archive
    case "zip":
      return "application/zip";
    case "rar":
      return "application/x-rar-compressed";
    case "7z":
      return "application/x-7z-compressed";
    default:
      return "application/octet-stream";
  }
}

// src/files/IOFiles.ts
var IOF = class _IOF {
  /**
   * Checks if a file exists at the specified path.
   * @param filePath - The path to the file.
   * @returns A boolean indicating whether the file exists.
   * @throws An error if the existence check fails.
   */
  static existsFileSync(filePath) {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      throw new Error(`Failed to check existence of ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Asynchronously checks if a file exists at the specified path.
   * @param filePath - The path to the file.
   * @returns A promise that resolves to a boolean indicating whether the file exists.
   * @throws An error if the existence check fails.
   */
  static async existsFile(filePath) {
    try {
      return await fs.promises.access(filePath, fs.constants.F_OK).then(() => true).catch(() => false);
    } catch (error) {
      throw new Error(`Failed to check existence of ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Creates a directory if it does not exist.
   * @param dirPath - The path of the directory to create.
   */
  static mkdir(dirPath) {
    try {
      if (!this.existsFileSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    } catch (error) {
      throw new Error(`Failed to create directory at ${dirPath}:  ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Removes a directory or file at the specified path.
   * If the path is a directory, it will be removed recursively.
   * @param dirPath - The path of the directory to remove.
   */
  static rm(dirPath) {
    try {
      if (this.existsFileSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    } catch (error) {
      throw new Error(`Failed to remove at ${dirPath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Watches a directory for file system events and executes a callback with the event details.
   * @param options - The options for the watcher.
   * @param options.dirPath - The path of the directory to watch.
   * @param options.event - The type of event to listen for (e.g., "add", "change", "unlink").
   * @param options.onEvent - Optional callback function to handle file system events.
   * 
   */
  static watcher(options) {
    const { dirPath, event, onEvent } = options;
    const fullPath = path.resolve(process.cwd(), dirPath);
    const watcher = import_chokidar.default.watch(fullPath, { persistent: true });
    watcher.on(event, async (filePath) => {
      if (onEvent) {
        await onEvent({
          filePath: path.resolve(process.cwd(), filePath),
          event
        });
      }
    });
    watcher.on("error", async (error) => {
      throw new Error(`Watcher error: ${error instanceof Error ? error.message : String(error)}`);
    });
  }
  /**
   * Writes data to a JSON file. Can either append to existing array or overwrite the file.
   * @param filePath - The path to the JSON file.
   * @param data - The data to write to the file (single object or array).
   * @param overwrite - If true, overwrites the file. If false, appends to existing array. Default is false.
   * @throws An error if the file cannot be written or if the content is not an array.
   */
  static async writeJSONFile(params) {
    const { filePath, data, overwrite = false } = params;
    try {
      if (!_IOF.existsFileSync(path.dirname(filePath))) {
        _IOF.mkdir(path.dirname(filePath));
      }
      let finalData;
      if (overwrite || !this.existsFileSync(filePath)) {
        finalData = Array.isArray(data) ? data : [data];
      } else {
        const jsonData = await fs.promises.readFile(filePath, "utf-8");
        let arrayData = JSON.parse(jsonData);
        if (!Array.isArray(arrayData)) arrayData = [];
        if (Array.isArray(data)) {
          finalData = [...arrayData, ...data];
        } else {
          finalData = [...arrayData, data];
        }
      }
      const newJsonData = JSON.stringify(finalData, null, 2);
      await fs.promises.writeFile(filePath, newJsonData);
    } catch (error) {
      throw new Error(`Failed to write JSON to ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Reads a JSON file and returns its content as an array.
   * @param filePath - The path to the JSON file.
   * @returns An array of objects parsed from the JSON file.
   * @throws An error if the file does not exist or if the content is not an array.
   */
  static async readJSONFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      const jsonData = await fs.promises.readFile(filePath, "utf-8");
      const arr = JSON.parse(jsonData);
      if (!Array.isArray(arr)) {
        throw new Error(`File content is not an array: ${filePath}`);
      }
      return arr;
    } catch (error) {
      throw new Error(`Failed to read JSON from ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Calculates the SHA-256 hash of a given buffer.
   * @param buffer - The buffer to hash.
   * @returns The SHA-256 hash as a hexadecimal string.
   */
  static calculateHashByBuffer(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error("Input must be a Buffer");
    }
    if (buffer.length === 0) {
      throw new Error("Buffer cannot be empty");
    }
    return crypto.createHash("sha256").update(buffer).digest("hex");
  }
  /**
   * Calculates the size of a file based on its buffer.
   * @param buffer - The buffer representing the file.
   * @returns The size of the file in bytes.
   */
  static calculateSizeByBuffer(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error("Input must be a Buffer");
    }
    if (buffer.length === 0) {
      throw new Error("Buffer cannot be empty");
    }
    return Buffer.byteLength(buffer);
  }
  /**
   * Saves a file buffer to the specified file path on disk.
   *
   * Calculates the file's hash, size, and MIME type, creates the necessary directories,
   * and writes the file data to disk. Returns an object containing metadata about the saved file.
   *
   * @param data - An object implementing the FileInterface, containing the file data, filename, and target filepath.
   * @returns A promise that resolves to a FileMetadata object with file metadata, or null if saving fails.
   * @throws {Error} If the file cannot be saved to the specified location.
   */
  async saveBufferToFile(data) {
    const hash = _IOF.calculateHashByBuffer(Buffer.from(data.filedata));
    const size = _IOF.calculateSizeByBuffer(Buffer.from(data.filedata));
    const type = mimeType(data.filename);
    try {
      const fullPath = path.resolve(process.cwd(), data.filepath, data.filename);
      const dir = path.dirname(fullPath);
      _IOF.mkdir(dir);
      await fs.promises.writeFile(fullPath, data.filedata);
      return {
        filename: data.filename,
        fileuri: fullPath,
        filehash: hash,
        filesize: size,
        mimeType: type,
        inlineData: Buffer.from(data.filedata).toString("base64")
      };
    } catch (error) {
      throw new Error(`Failed to set file location: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Downloads a file from a given URL and saves it to the specified download path.
   * @param data - The file download data including the file URL and save path.
   * @returns The metadata of the downloaded file.
   */
  static async downloadFile(data) {
    try {
      const response = await fetch(data.fileuri);
      const buffer = await response.arrayBuffer();
      const fileName = path.basename(data.fileuri);
      const filePath = path.join(data.saveTo, fileName);
      fs.writeFileSync(filePath, Buffer.from(buffer));
      return {
        filename: fileName,
        fileuri: filePath,
        filehash: _IOF.calculateHashByBuffer(Buffer.from(buffer)),
        filesize: _IOF.calculateSizeByBuffer(Buffer.from(buffer)),
        mimeType: mimeType(fileName),
        inlineData: Buffer.from(buffer).toString("base64")
      };
    } catch (error) {
      throw new Error(`Failed to download file: ${error}`);
    }
  }
  /**
   * Retrieves the string content of a text file.
   * @param filePath - The path to the text file.
   * @returns A promise that resolves to the content of the file as a string.
   * @throws An error if the file cannot be read.
   */
  static async readTextFile(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, "utf-8");
      return data;
    } catch (error) {
      throw new Error(`Failed to read file at ${filePath}`);
    }
  }
  /**
   * Converts a file to a generative path format suitable for AI/ML models.
   * 
   * Reads a file from the filesystem and converts it to a base64-encoded format
   * with MIME type information, wrapped in the structure expected by generative AI APIs.
   * 
   * @param fileName - The path to the file to be converted
   * @returns A promise that resolves to an object containing the file data in generative path format
   * @returns The returned object has an `inlineData` property with `data` (base64 string) and `mimeType`
   * 
   * @throws {Error} When file reading fails or MIME type detection fails
   * 
   * @example
   * ```typescript
   * const generativePath = await fileToGenerativePath('./image.png');
   * // Returns: { inlineData: { data: "iVBORw0KGgoAAAANSUhEUgAA...", mimeType: "image/png" } }
   * ```
   */
  async fileToGenerativePath(fileName) {
    try {
      const mime = mimeType(fileName);
      const file = await fs.promises.readFile(fileName);
      return {
        inlineData: {
          data: Buffer.from(file).toString("base64"),
          mimeType: mime
        }
      };
    } catch (error) {
      throw new Error(`Failed to convert file to generative path: ${error}`);
    }
  }
};

// src/terminal/terminalColors.ts
var TerminalColors = {
  _reset: "\x1B[0m",
  _bright: "\x1B[1m",
  _dim: "\x1B[2m",
  _italic: "\x1B[3m",
  _underline: "\x1B[4m",
  _blink: "\x1B[5m",
  _reverse: "\x1B[7m",
  _hidden: "\x1B[8m",
  _strikethrough: "\x1B[9m",
  // Foreground colors
  BLACK: "\x1B[30m",
  RED: "\x1B[31m",
  GREEN: "\x1B[32m",
  YELLOW: "\x1B[33m",
  BLUE: "\x1B[34m",
  MAGENTA: "\x1B[35m",
  CYAN: "\x1B[36m",
  WHITE: "\x1B[37m",
  // Bright foreground colors
  BRIGHT_BLACK: "\x1B[90m",
  BRIGHT_RED: "\x1B[91m",
  BRIGHT_GREEN: "\x1B[92m",
  BRIGHT_YELLOW: "\x1B[93m",
  BRIGHT_BLUE: "\x1B[94m",
  BRIGHT_MAGENTA: "\x1B[95m",
  BRIGHT_CYAN: "\x1B[96m",
  BRIGHT_WHITE: "\x1B[97m",
  // Background colors
  BBLACK: "\x1B[40m",
  BRED: "\x1B[41m",
  BGREEN: "\x1B[42m",
  BYELLOW: "\x1B[43m",
  BBLUE: "\x1B[44m",
  BMAGENTA: "\x1B[45m",
  BCYAN: "\x1B[46m",
  BWHITE: "\x1B[47m",
  // Bright background colors
  BBRIGHT_BLACK: "\x1B[100m",
  BBRIGHT_RED: "\x1B[101m",
  BBRIGHT_GREEN: "\x1B[102m",
  BBRIGHT_YELLOW: "\x1B[103m",
  BBRIGHT_BLUE: "\x1B[104m",
  BBRIGHT_MAGENTA: "\x1B[105m",
  BBRIGHT_CYAN: "\x1B[106m",
  BBRIGHT_WHITE: "\x1B[107m",
  // 256-color support functions
  fg256: (n) => `\x1B[38;5;${n}m`,
  bg256: (n) => `\x1B[48;5;${n}m`,
  // RGB color support functions
  fgRGB: (r, g, b) => `\x1B[38;2;${r};${g};${b}m`,
  bgRGB: (r, g, b) => `\x1B[48;2;${r};${g};${b}m`
};

// src/utils/time.ts
var Time = class _Time {
  static formatDateToParts(date, locale, timeZone) {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid date provided to formatDateToParts");
    }
    const systemLocale = locale || _Time.getSystemLocale();
    const systemTimeZone = timeZone || _Time.getSystemTimezone();
    try {
      const formatter = new Intl.DateTimeFormat(systemLocale, {
        timeZone: systemTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      const formattedParts = formatter.formatToParts(date);
      const dateParts = {};
      formattedParts.forEach(({ type, value }) => {
        dateParts[type] = value;
      });
      const requiredParts = ["year", "month", "day", "hour", "minute", "second"];
      for (const part of requiredParts) {
        if (!dateParts[part]) {
          throw new Error(`Missing date part: ${part}`);
        }
      }
      return dateParts;
    } catch (error) {
      throw new Error(`Failed to format date: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  static formatDateString(dateParts, timeZone) {
    const tz = timeZone || _Time.getSystemTimezone();
    if (tz === "UTC") {
      return `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}Z`;
    } else {
      const date = /* @__PURE__ */ new Date(`${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}`);
      const offset = _Time.getTimezoneOffset(tz, date);
      return `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}${offset}`;
    }
  }
  /**
   * Gets the timezone offset string for a given timezone
   */
  static getTimezoneOffset(timeZone, date) {
    try {
      const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
      const localDate = new Date(date.toLocaleString("en-US", { timeZone }));
      const offsetMinutes = (localDate.getTime() - utcDate.getTime()) / (1e3 * 60);
      const hours = Math.floor(Math.abs(offsetMinutes) / 60);
      const minutes = Math.abs(offsetMinutes) % 60;
      const sign = offsetMinutes >= 0 ? "+" : "-";
      return `${sign}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    } catch {
      return "+00:00";
    }
  }
  static formatDateToSaveString(dateParts) {
    return `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}-${dateParts.minute}-${dateParts.second}`;
  }
  static logFormat(dateParts) {
    return `${dateParts.day}/${dateParts.month}/${dateParts.year}:${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
  }
  /**
   * Validates if a timezone is supported
   */
  static isValidTimeZone(timeZone) {
    try {
      Intl.DateTimeFormat(void 0, { timeZone });
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Validates if a locale is supported
   */
  static isValidLocale(locale) {
    try {
      new Intl.DateTimeFormat(locale);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Gets the system's default timezone
   */
  static getSystemTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /**
   * Gets the system's default locale
   */
  static getSystemLocale() {
    return Intl.DateTimeFormat().resolvedOptions().locale;
  }
  /**
   * Gets both system locale and timezone
   */
  static getSystemLocaleAndTimezone() {
    const resolved = Intl.DateTimeFormat().resolvedOptions();
    return {
      locale: resolved.locale,
      timeZone: resolved.timeZone
    };
  }
  /**
   * Formats a date to a human-readable string using locale-specific formatting.
   * @param data Object containing date, locale, and timeZone
   * @returns The formatted date string respecting locale conventions
   */
  static formatDateToHumanReadable(data) {
    const { date, locale, timeZone } = data;
    const targetDate = date || /* @__PURE__ */ new Date();
    const systemLocale = locale || _Time.getSystemLocale();
    const systemTimeZone = timeZone || _Time.getSystemTimezone();
    try {
      const formatter = new Intl.DateTimeFormat(systemLocale, {
        timeZone: systemTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      return formatter.format(targetDate);
    } catch (error) {
      const dateParts = _Time.formatDateToParts(targetDate, locale, timeZone);
      return `${dateParts.day}/${dateParts.month}/${dateParts.year} ${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
    }
  }
  /**
   * Returns the current time formatted as a string suitable for saving.
   * This format is `YYYY-MM-DDTHH-MM-SSZ`, which is useful for file naming or database storage.
   */
  static getCurrentTimeToSaveString(locale, timeZone) {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, locale, timeZone);
    return _Time.formatDateToSaveString(dateParts);
  }
  /**
   * Returns the current time as a Date object in the specified timezone.
   * Note: This returns a new Date object representing the current moment,
   * but when displayed it will show the time in the specified timezone.
   */
  static getCurrentTime(locale, timeZone) {
    return /* @__PURE__ */ new Date();
  }
  /**
   * Returns the current time formatted as a string.
   * This format includes proper timezone information (Z for UTC, +HH:MM for others).
   */
  static getCurrentTimeToString(locale, timeZone) {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, locale, timeZone);
    const tz = timeZone || _Time.getSystemTimezone();
    return _Time.formatDateString(dateParts, tz);
  }
  /**
   * Returns the current time in a human-readable format.
   * This format is `DD/MM/YYYY HH:MM:SS`, which is suitable for display to users.
   */
  static getCurrentTimeToHumanReadable(locale, timeZone) {
    const now = /* @__PURE__ */ new Date();
    return _Time.formatDateToHumanReadable({ date: now, locale, timeZone });
  }
  /**
   * Safely parses a date string or date object
   */
  static parseDate(input) {
    if (input instanceof Date) {
      if (isNaN(input.getTime())) {
        throw new Error("Invalid Date object provided");
      }
      return input;
    }
    if (typeof input === "number") {
      const date = new Date(input);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid timestamp provided");
      }
      return date;
    }
    if (typeof input === "string") {
      const date = new Date(input);
      if (isNaN(date.getTime())) {
        throw new Error(`Unable to parse date string: "${input}"`);
      }
      return date;
    }
    throw new Error("Input must be a Date object, timestamp number, or valid date string");
  }
  /**
   * Returns the current time formatted for logging.
   * This format is `DD/MM/YYYY:HH:MM:SS`, which is useful for log entries.
   */
  static getTimeToLogFormat(locale, timeZone) {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, locale, timeZone);
    return _Time.logFormat(dateParts);
  }
};

// src/terminal/logger.ts
var Logger = class {
  /**
   * Flag to control whether to show function names in regular Logger methods
   * Set to false by default - use Logger.pfn for function names
   */
  static showFunctionName = false;
  /**
   * Proxy object for logging with function names
   */
  static pfn = {
    success: (...args) => this.logWithReturn("SUCCESS", true, ...args),
    error: (...args) => this.logWithReturn("ERROR", true, ...args),
    warn: (...args) => this.logWithReturn("WARN", true, ...args),
    info: (...args) => this.logWithReturn("INFO", true, ...args),
    debug: (...args) => this.logWithReturn("DEBUG", true, ...args),
    custom: (opt, ...args) => this.customWithReturn(opt, true, ...args)
  };
  static getCallerName() {
    if (!this.showFunctionName) {
      return "";
    }
    const err = new Error();
    if (err.stack) {
      const stackLines = err.stack.split("\n");
      for (let i = 2; i < stackLines.length; i++) {
        const line = stackLines[i];
        if (line.includes("Logger.log") || line.includes("Logger.success") || line.includes("Logger.error") || line.includes("Logger.warn") || line.includes("Logger.info") || line.includes("Logger.debug") || line.includes("Logger.custom") || line.includes("Function.getCallerName") || line.includes("Function.logWithReturn") || line.includes("Function.customWithReturn") || line.includes("at Object.<anonymous>") || line.includes("Module._compile") || line.includes("at Module.load") || line.includes("transformer")) {
          continue;
        }
        if (line.includes("at <anonymous>") && !line.match(/at\s+<anonymous>\s+\(/)) {
          continue;
        }
        if (line.trim() !== "") {
          let match = line.match(/at\s+(\w+)\s+\(/);
          if (match && match[1] && match[1] !== "Object" && match[1] !== "Function") {
            return `fn: ${match[1]}`;
          }
          if (line.includes("at <anonymous>")) {
            return `fn: <anonymous>`;
          }
        }
      }
    }
    return "";
  }
  static getCallerNameForced() {
    const err = new Error();
    if (err.stack) {
      const stackLines = err.stack.split("\n");
      for (let i = 2; i < stackLines.length; i++) {
        const line = stackLines[i];
        if (line.includes("Logger.log") || line.includes("Logger.success") || line.includes("Logger.error") || line.includes("Logger.warn") || line.includes("Logger.info") || line.includes("Logger.debug") || line.includes("Logger.custom") || line.includes("Function.getCallerName") || line.includes("Function.logWithReturn") || line.includes("Function.customWithReturn") || line.includes("at Object.<anonymous>") || line.includes("Module._compile") || line.includes("at Module.load") || line.includes("transformer")) {
          continue;
        }
        if (line.includes("at <anonymous>") && !line.match(/at\s+<anonymous>\s+\(/)) {
          continue;
        }
        if (line.trim() !== "") {
          let match = line.match(/at\s+(\w+)\s+\(/);
          if (match && match[1] && match[1] !== "Object" && match[1] !== "Function") {
            return `fn: ${match[1]}`;
          }
          if (line.includes("at <anonymous>")) {
            return `fn: <anonymous>`;
          }
        }
      }
    }
    return "";
  }
  static log(type, ...args) {
    const colorMap = {
      DEBUG: TerminalColors.MAGENTA,
      WARN: TerminalColors.BYELLOW,
      ERROR: TerminalColors.RED,
      INFO: TerminalColors.BLUE,
      SUCCESS: TerminalColors.GREEN
    };
    const color = colorMap[type] || TerminalColors._reset;
    const currentTime = Time.getTimeToLogFormat();
    const functionName = this.getCallerName();
    const message = args.map((a) => {
      if (a instanceof Error) {
        return a.stack || a.message;
      }
      if (typeof a === "object") {
        return JSON.stringify(a);
      }
      return String(a);
    }).join(" ");
    const logMethod = type === "ERROR" || type === "WARN" ? console.log : type === "INFO" ? console.info : console.log;
    logMethod(`${TerminalColors._dim}[${currentTime}]${TerminalColors._reset} ${color}[${type}]${TerminalColors._reset} ${functionName}: ${message}`);
  }
  static logWithReturn(type, withFunctionName, ...args) {
    const colorMap = {
      DEBUG: TerminalColors.MAGENTA,
      WARN: TerminalColors.BYELLOW,
      ERROR: TerminalColors.RED,
      INFO: TerminalColors.BLUE,
      SUCCESS: TerminalColors.GREEN
    };
    const color = colorMap[type] || TerminalColors._reset;
    const currentTime = Time.getTimeToLogFormat();
    const detectedFunctionName = this.getCallerNameForced();
    const displayFunctionName = withFunctionName ? detectedFunctionName : this.showFunctionName ? this.getCallerName() : "";
    let processedMessage;
    if (args.length === 1) {
      processedMessage = args[0];
    } else if (args.length > 1) {
      processedMessage = args;
    } else {
      processedMessage = "";
    }
    const consoleMessage = args.map((a) => {
      if (a instanceof Error) {
        return a.stack || a.message;
      }
      if (typeof a === "object") {
        return JSON.stringify(a);
      }
      return String(a);
    }).join(" ");
    const logMethod = type === "ERROR" || type === "WARN" ? console.log : type === "INFO" ? console.info : console.log;
    logMethod(`${TerminalColors._dim}[${currentTime}]${TerminalColors._reset} ${color}[${type}]${TerminalColors._reset} ${displayFunctionName}: ${consoleMessage}`);
    const result = {
      pfn: detectedFunctionName.replace("fn: ", ""),
      timestamp: currentTime,
      message: processedMessage,
      level: type
    };
    return result;
  }
  /**
   * Logs a success message.
   * @param args - The messages to log.
   * @returns LogReturn object with structured data
   */
  static success(...args) {
    return this.logWithReturn("SUCCESS", this.showFunctionName, ...args);
  }
  /**
   * Logs an error message.
   * @param args - The messages to log.
   * @returns LogReturn object with structured data
   */
  static error(...args) {
    return this.logWithReturn("ERROR", this.showFunctionName, ...args);
  }
  /**
   * Logs a warning message.
   * @param args - The messages to log.
   * @returns LogReturn object with structured data
   */
  static warn(...args) {
    return this.logWithReturn("WARN", this.showFunctionName, ...args);
  }
  /**
   * Logs an informational message.
   * @param args - The messages to log.
   * @returns LogReturn object with structured data
   */
  static info(...args) {
    return this.logWithReturn("INFO", this.showFunctionName, ...args);
  }
  /**
   * Logs a debug message.
   * @param args - The messages to log.
   * @returns LogReturn object with structured data
   */
  static debug(...args) {
    return this.logWithReturn("DEBUG", this.showFunctionName, ...args);
  }
  /**
   * Custom log method that allows specifying a type and color.
   * @param opt - Options for the custom log.
   * @param args - The messages to log.
   * @returns LogReturn object with structured data
   */
  static custom(opt, ...args) {
    return this.customWithReturn(opt, this.showFunctionName, ...args);
  }
  static customWithReturn(opt, withFunctionName, ...args) {
    const logColor = opt.color || "CYAN";
    const currentTime = Time.getTimeToLogFormat();
    const detectedFunctionName = this.getCallerNameForced();
    const displayFunctionName = withFunctionName ? detectedFunctionName : this.showFunctionName ? this.getCallerName() : "";
    let processedMessage;
    if (args.length === 1) {
      processedMessage = args[0];
    } else if (args.length > 1) {
      processedMessage = args;
    } else {
      processedMessage = "";
    }
    const consoleMessage = args.map((a) => {
      if (a instanceof Error) {
        return a.stack || a.message;
      }
      if (typeof a === "object") {
        return JSON.stringify(a);
      }
      return String(a);
    }).join(" ");
    console.log(`${TerminalColors._dim}[${currentTime}]${TerminalColors._reset} ${TerminalColors[logColor]}[${opt.type}]${TerminalColors._reset} ${displayFunctionName}: ${consoleMessage}`);
    const result = {
      pfn: detectedFunctionName.replace("fn: ", ""),
      timestamp: currentTime,
      message: processedMessage,
      level: opt.type
    };
    return result;
  }
};

// src/terminal/terminalinteractive.ts
var import_readline = require("readline");
var import_dotenv = __toESM(require("dotenv"));
var Terminal = class _Terminal {
  static instance;
  readlineInterface;
  constructor() {
    this.readlineInterface = (0, import_readline.createInterface)({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
      completer: (line) => {
        const completions = ["help", "exit", "clear"];
        const hits = completions.filter((c) => c.startsWith(line));
        return [hits.length ? hits : completions, line];
      }
    });
  }
  getInstance() {
    if (!_Terminal.instance) {
      _Terminal.instance = new _Terminal();
    }
    return _Terminal.instance;
  }
  /**
   * Prompts the user for input and returns the response.
   * @param question The question to ask the user.
   * @returns A promise that resolves to the user's input.
   */
  question(question) {
    return new Promise((resolve2) => {
      this.readlineInterface.question(question ? question + ": " : ": ", (answer) => {
        resolve2(answer);
      });
    });
  }
  /**
   * Closes the terminal interface and exits the process.
   * This function is useful for gracefully shutting down the terminal.
   * @param code The exit code (default is 0).
   * @example
   * terminal.close(0); // Closes the terminal and exits with code 0
   * terminal.close(1); // Closes the terminal and exits with code 1
   * terminal.close();  // Closes the terminal and exits with code 0
   * @see {@link https://nodejs.org/api/process.html#process_process_exit_code} for more information
   */
  close(code = 0) {
    this.readlineInterface.close();
    process.exit(code);
  }
  /**
   * Prompts the user for input without a specific question.
   * This function is useful for creating a prompt without a predefined question.
   * It simply displays a prompt symbol (": ") and waits for user input.
   */
  prompt() {
    this.readlineInterface.prompt();
  }
  /**
   * Clears the terminal screen.
   * @returns A promise that resolves to the user's input.
   */
  clear() {
    process.stdout.write("\x1Bc");
  }
  /**
   * Pauses execution for a specified duration (in seconds), similar to Python's sleep.
   * @param duration Duration in seconds
   */
  sleep(duration) {
    return new Promise((resolve2) => setTimeout(resolve2, duration * 1e3));
  }
  /**
   * Parses environment variables that start with a given prefix.
   * @param prefix The prefix to filter environment variables.
   * @param options Optional dotenv configuration options.
   * @returns An object containing arrays of keys and values.
   */
  envParser(prefix, options) {
    import_dotenv.default.config({
      quiet: true,
      ...options
    });
    const envKeys = Object.keys(process.env).filter(
      (key) => key.startsWith(prefix)
    );
    const keys = [];
    const values = [];
    envKeys.forEach((key) => {
      if (process.env[key]) {
        keys.push(key);
        values.push(process.env[key]);
      }
    });
    return { keys, values };
  }
};
var terminal = new Terminal();

// src/metadata/userAgentParser.ts
var UAParser = class _UAParser {
  userAgent;
  // Browser patterns with engine detection
  static browserPatterns = [
    // Modern browsers first (more specific)
    { name: "Edge", pattern: /\bEdg\/([\d\.]+)/, engine: "Blink" },
    { name: "Chrome", pattern: /\bChrome\/([\d\.]+)/, engine: "Blink" },
    { name: "Firefox", pattern: /\bFirefox\/([\d\.]+)/, engine: "Gecko" },
    { name: "Safari", pattern: /\bVersion\/([\d\.]+).*Safari/, engine: "WebKit" },
    { name: "Opera", pattern: /\bOPR\/([\d\.]+)/, engine: "Blink" },
    { name: "Opera", pattern: /\bOpera\/([\d\.]+)/, engine: "Presto" },
    { name: "Samsung Browser", pattern: /\bSamsungBrowser\/([\d\.]+)/, engine: "Blink" },
    { name: "UC Browser", pattern: /\bUCBrowser\/([\d\.]+)/, engine: "WebKit" },
    { name: "Brave", pattern: /\bBrave\/([\d\.]+)/, engine: "Blink" },
    { name: "Vivaldi", pattern: /\bVivaldi\/([\d\.]+)/, engine: "Blink" },
    // Legacy browsers
    { name: "Internet Explorer", pattern: /\bMSIE\s([\d\.]+)/, engine: "Trident" },
    { name: "Internet Explorer", pattern: /\bTrident.*rv:([\d\.]+)/, engine: "Trident" },
    // Mobile browsers
    { name: "Mobile Safari", pattern: /\bMobile.*Safari\/([\d\.]+)/, engine: "WebKit" },
    { name: "Chrome Mobile", pattern: /\bCrMo\/([\d\.]+)/, engine: "Blink" },
    { name: "Chrome Mobile", pattern: /\bCriOS\/([\d\.]+)/, engine: "WebKit" },
    { name: "Firefox Mobile", pattern: /\bFxiOS\/([\d\.]+)/, engine: "WebKit" },
    // Webview and embedded
    { name: "Android WebView", pattern: /\bwv\).*Chrome\/([\d\.]+)/, engine: "Blink" },
    { name: "WebView", pattern: /\bWebView\/([\d\.]+)/, engine: "WebKit" }
  ];
  // Operating System patterns
  static osPatterns = [
    // Desktop OS
    { name: "Windows 11", pattern: /Windows NT 10\.0.*\b(22000|22621|22631)\b/ },
    { name: "Windows 10", pattern: /Windows NT 10\.0/ },
    { name: "Windows 8.1", pattern: /Windows NT 6\.3/ },
    { name: "Windows 8", pattern: /Windows NT 6\.2/ },
    { name: "Windows 7", pattern: /Windows NT 6\.1/ },
    { name: "Windows Vista", pattern: /Windows NT 6\.0/ },
    { name: "Windows XP", pattern: /Windows NT 5\.1/ },
    // macOS versions
    { name: "macOS Sonoma", pattern: /Mac OS X 10[._]15|macOS.*14[._]\d+/ },
    { name: "macOS Ventura", pattern: /Mac OS X 10[._]15|macOS.*13[._]\d+/ },
    { name: "macOS Monterey", pattern: /Mac OS X 10[._]15|macOS.*12[._]\d+/ },
    { name: "macOS Big Sur", pattern: /Mac OS X 10[._]15|macOS.*11[._]\d+/ },
    { name: "macOS Catalina", pattern: /Mac OS X 10[._]15/ },
    { name: "macOS Mojave", pattern: /Mac OS X 10[._]14/ },
    { name: "macOS High Sierra", pattern: /Mac OS X 10[._]13/ },
    { name: "macOS Sierra", pattern: /Mac OS X 10[._]12/ },
    { name: "Mac OS X", pattern: /Mac OS X ([\d\._]+)/ },
    // Linux distributions
    { name: "Ubuntu", pattern: /Ubuntu/ },
    { name: "Debian", pattern: /Debian/ },
    { name: "CentOS", pattern: /CentOS/ },
    { name: "Red Hat", pattern: /Red Hat/ },
    { name: "Fedora", pattern: /Fedora/ },
    { name: "SUSE", pattern: /SUSE/ },
    { name: "Arch Linux", pattern: /Arch/ },
    { name: "Linux", pattern: /Linux/ },
    // Mobile OS
    { name: "iOS", pattern: /(?:iPhone|iPad|iPod).*OS ([\d_]+)/ },
    { name: "Android", pattern: /Android ([\d\.]+)/ },
    { name: "Windows Phone", pattern: /Windows Phone ([\d\.]+)/ },
    { name: "BlackBerry", pattern: /BlackBerry|BB10/ },
    // Other OS
    { name: "Chrome OS", pattern: /CrOS/ },
    { name: "FreeBSD", pattern: /FreeBSD/ },
    { name: "OpenBSD", pattern: /OpenBSD/ },
    { name: "NetBSD", pattern: /NetBSD/ },
    { name: "Solaris", pattern: /SunOS/ }
  ];
  // Device patterns
  static devicePatterns = [
    // Smartphones
    { type: "mobile", vendor: "Apple", pattern: /iPhone/ },
    { type: "mobile", vendor: "Samsung", pattern: /SM-[A-Z]\d+/ },
    { type: "mobile", vendor: "Google", pattern: /Pixel/ },
    { type: "mobile", vendor: "OnePlus", pattern: /OnePlus/ },
    { type: "mobile", vendor: "Xiaomi", pattern: /Mi\s|Redmi/ },
    { type: "mobile", vendor: "Huawei", pattern: /HUAWEI|Honor/ },
    { type: "mobile", vendor: "LG", pattern: /LG-/ },
    { type: "mobile", vendor: "Sony", pattern: /Sony/ },
    { type: "mobile", vendor: "HTC", pattern: /HTC/ },
    { type: "mobile", vendor: "Motorola", pattern: /Moto/ },
    // Tablets
    { type: "tablet", vendor: "Apple", pattern: /iPad/ },
    { type: "tablet", vendor: "Samsung", pattern: /SM-T/ },
    { type: "tablet", vendor: "Amazon", pattern: /Kindle|KFAPWI/ },
    { type: "tablet", vendor: "Microsoft", pattern: /Surface/ },
    // Smart TVs
    { type: "smarttv", vendor: "Samsung", pattern: /SMART-TV|SmartTV/ },
    { type: "smarttv", vendor: "LG", pattern: /webOS/ },
    { type: "smarttv", vendor: "Sony", pattern: /SonyDTV/ },
    // Gaming consoles
    { type: "console", vendor: "Sony", pattern: /PlayStation/ },
    { type: "console", vendor: "Microsoft", pattern: /Xbox/ },
    { type: "console", vendor: "Nintendo", pattern: /Nintendo/ },
    // Wearables
    { type: "wearable", vendor: "Apple", pattern: /Watch/ },
    { type: "wearable", vendor: "Samsung", pattern: /SM-R/ }
  ];
  // Bot patterns
  static botPatterns = [
    /bot|crawler|spider|crawling/i,
    /googlebot|bingbot|slurp|duckduckbot/i,
    /facebookexternalhit|twitterbot|linkedinbot/i,
    /whatsapp|telegram|discord/i,
    /headless|phantom|selenium|webdriver/i
  ];
  // CPU Architecture patterns
  static cpuPatterns = [
    { arch: "amd64", pattern: /(?:amd64|x86_64|win64|wow64)/i },
    { arch: "ia32", pattern: /(?:i[346]86|x86)/i },
    { arch: "arm64", pattern: /(?:arm64|aarch64)/i },
    { arch: "arm", pattern: /arm/i },
    { arch: "mips", pattern: /mips/i },
    { arch: "sparc", pattern: /sparc/i },
    { arch: "ppc", pattern: /ppc|powerpc/i }
  ];
  constructor(userAgent) {
    this.userAgent = userAgent || (typeof navigator !== "undefined" ? navigator.userAgent : "");
  }
  /**
   * Parse the user agent string and return detailed information
   */
  getResult() {
    const browser = this.parseBrowser();
    const os = this.parseOS();
    const device = this.parseDevice();
    const cpu = this.parseCPU();
    const extra = this.parseExtra();
    return {
      browser,
      os,
      device,
      cpu,
      extra
    };
  }
  /**
   * Parse browser information
   */
  parseBrowser() {
    for (const browser of _UAParser.browserPatterns) {
      const match = this.userAgent.match(browser.pattern);
      if (match) {
        const version = match[1] || null;
        const major = version ? version.split(".")[0] : null;
        return {
          name: browser.name,
          version,
          major,
          engine: browser.engine
        };
      }
    }
    return {
      name: null,
      version: null,
      major: null,
      engine: null
    };
  }
  /**
   * Parse operating system information
   */
  parseOS() {
    for (const os of _UAParser.osPatterns) {
      const match = this.userAgent.match(os.pattern);
      if (match) {
        const version = match[1] ? match[1].replace(/_/g, ".") : null;
        return {
          name: os.name,
          version,
          versionName: this.getOSVersionName(os.name, version)
        };
      }
    }
    return {
      name: null,
      version: null,
      versionName: null
    };
  }
  /**
   * Parse device information
   */
  parseDevice() {
    for (const device of _UAParser.devicePatterns) {
      if (device.pattern.test(this.userAgent)) {
        const model = this.extractDeviceModel(device.vendor, device.type);
        return {
          type: device.type,
          vendor: device.vendor,
          model
        };
      }
    }
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(this.userAgent);
    return {
      type: isMobile ? "mobile" : "desktop",
      vendor: null,
      model: null
    };
  }
  /**
   * Parse CPU architecture
   */
  parseCPU() {
    for (const cpu of _UAParser.cpuPatterns) {
      if (cpu.pattern.test(this.userAgent)) {
        return {
          architecture: cpu.arch
        };
      }
    }
    return {
      architecture: null
    };
  }
  /**
   * Parse extra information and flags
   */
  parseExtra() {
    const isMobile = /Mobile|Android|iPhone|BlackBerry|Windows Phone/i.test(this.userAgent);
    const isTablet = /iPad|Tablet|Kindle/i.test(this.userAgent);
    const isTV = /TV|webOS|Tizen|SmartTV/i.test(this.userAgent);
    const isWearable = /Watch|Wear/i.test(this.userAgent);
    const isConsole = /PlayStation|Xbox|Nintendo/i.test(this.userAgent);
    const isEmbedded = /Embedded|IoT|Smart/i.test(this.userAgent);
    const isBot = _UAParser.botPatterns.some((pattern) => pattern.test(this.userAgent));
    const isDesktop = !isMobile && !isTablet && !isTV && !isWearable && !isConsole && !isEmbedded;
    return {
      isMobile,
      isTablet,
      isDesktop,
      isBot,
      isTV,
      isWearable,
      isConsole,
      isEmbedded
    };
  }
  /**
   * Get OS version name based on version number
   */
  getOSVersionName(osName, version) {
    if (!osName || !version) return null;
    const versionNames = {
      "iOS": {
        "17": "iOS 17",
        "16": "iOS 16",
        "15": "iOS 15",
        "14": "iOS 14",
        "13": "iOS 13"
      },
      "Android": {
        "14": "Android 14",
        "13": "Android 13 Tiramisu",
        "12": "Android 12",
        "11": "Android 11",
        "10": "Android 10 Q"
      }
    };
    const majorVersion = version.split(".")[0];
    return versionNames[osName]?.[majorVersion] || null;
  }
  /**
   * Extract device model from user agent
   */
  extractDeviceModel(vendor, type) {
    if (!vendor) return null;
    if (vendor === "Samsung") {
      const match = this.userAgent.match(/SM-[A-Z]\d+[A-Z]?/);
      return match ? match[0] : null;
    }
    if (vendor === "Apple") {
      if (type === "mobile") {
        const match = this.userAgent.match(/iPhone\d+,\d+/);
        return match ? match[0] : "iPhone";
      }
      if (type === "tablet") {
        const match = this.userAgent.match(/iPad\d+,\d+/);
        return match ? match[0] : "iPad";
      }
    }
    if (vendor === "Google") {
      const match = this.userAgent.match(/Pixel \d+[a-zA-Z]*/);
      return match ? match[0] : null;
    }
    return null;
  }
  /**
   * Get detailed browser information
   */
  getBrowser() {
    return this.getResult().browser;
  }
  /**
   * Get detailed OS information
   */
  getOS() {
    return this.getResult().os;
  }
  /**
   * Get detailed device information
   */
  getDevice() {
    return this.getResult().device;
  }
  /**
   * Get CPU architecture information
   */
  getCPU() {
    return this.getResult().cpu;
  }
  /**
   * Check if device is mobile
   */
  isMobile() {
    return this.getResult().extra.isMobile;
  }
  /**
   * Check if device is tablet
   */
  isTablet() {
    return this.getResult().extra.isTablet;
  }
  /**
   * Check if device is desktop
   */
  isDesktop() {
    return this.getResult().extra.isDesktop;
  }
  /**
   * Check if user agent is a bot
   */
  isBot() {
    return this.getResult().extra.isBot;
  }
  /**
   * Get formatted string representation
   */
  toString() {
    const result = this.getResult();
    const parts = [];
    if (result.browser.name) {
      parts.push(`${result.browser.name} ${result.browser.version || ""}`);
    }
    if (result.os.name) {
      parts.push(`on ${result.os.name} ${result.os.version || ""}`);
    }
    if (result.device.vendor && result.device.model) {
      parts.push(`(${result.device.vendor} ${result.device.model})`);
    } else if (result.device.type && result.device.type !== "desktop") {
      parts.push(`(${result.device.type})`);
    }
    return parts.join(" ").trim();
  }
  /**
   * Set user agent string
   */
  setUA(userAgent) {
    this.userAgent = userAgent;
    return this;
  }
  /**
   * Get current user agent string
   */
  getUA() {
    return this.userAgent;
  }
  /**
   * Static method to quickly parse user agent
   */
  static parse(userAgent) {
    return new _UAParser(userAgent).getResult();
  }
};

// src/metadata/metadata.ts
function parseUserAgent(userAgent) {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  return {
    browser: result.browser.name || null,
    browserVersion: result.browser.version || null,
    operatingSystem: result.os.name || null,
    osVersion: result.os.version || null,
    deviceType: result.device.type || "desktop",
    deviceBrand: result.device.vendor || null,
    deviceModel: result.device.model || null,
    isMobile: result.extra.isMobile,
    isBot: result.extra.isBot
  };
}
function getIpInfo(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  const url = new URL(request.url);
  const ip = forwarded?.split(",")[0]?.trim() || realIp || cfConnectingIp || url.hostname || "unknown";
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  let ipVersion = "unknown";
  if (ipv4Regex.test(ip)) {
    ipVersion = "IPv4";
  } else if (ipv6Regex.test(ip)) {
    ipVersion = "IPv6";
  }
  return { ip, ipVersion };
}
async function getLocationFromIP(ip) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.status === "success") {
      return {
        country: data.country,
        countryCode: data.countryCode,
        region: data.region,
        regionName: data.regionName,
        city: data.city,
        zip: data.zip,
        lat: data.lat,
        lon: data.lon,
        timezone: data.timezone,
        isp: data.isp,
        org: data.org
      };
    }
  } catch (error) {
    throw error;
  }
}
function generateFingerprint(request, device) {
  const components = [
    device.browser,
    device.operatingSystem,
    request.headers.get("accept-language"),
    request.headers.get("accept-encoding"),
    device.deviceType
  ].filter(Boolean);
  return Buffer.from(components.join("|")).toString("base64");
}
function getSessionId(request) {
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split("=");
      acc[name] = value;
      return acc;
    }, {});
    const sessionCookie = cookies["session-id"];
    if (sessionCookie) return sessionCookie;
  }
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}
function getReferrerDomain(referrer) {
  if (!referrer) return void 0;
  try {
    const url = new URL(referrer);
    return url.hostname;
  } catch {
    return void 0;
  }
}
async function collectAnalytics(request) {
  try {
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || void 0;
    const { ip, ipVersion } = getIpInfo(request);
    const device = parseUserAgent(userAgent);
    const sessionId = getSessionId(request);
    const fingerprint = generateFingerprint(request, device);
    if (device.isBot) {
      return;
    }
    const location = await getLocationFromIP(ip);
    const referrerDomain = getReferrerDomain(referrer);
    const url = new URL(request.url);
    const metadata = {
      // IP and Location
      ip,
      ipVersion,
      country: location?.country,
      countryCode: location?.countryCode,
      region: location?.region,
      regionName: location?.regionName,
      city: location?.city,
      zip: location?.zip,
      latitude: location?.lat,
      longitude: location?.lon,
      timezone: location?.timezone,
      isp: location?.isp,
      organization: location?.org,
      // User Agent and Device
      userAgent,
      browser: device.browser,
      browserVersion: device.browserVersion,
      operatingSystem: device.operatingSystem,
      osVersion: device.osVersion,
      deviceType: device.deviceType,
      deviceBrand: device.deviceBrand,
      deviceModel: device.deviceModel,
      isMobile: device.isMobile,
      isBot: device.isBot,
      // Request Headers
      acceptLanguage: request.headers.get("accept-language"),
      acceptEncoding: request.headers.get("accept-encoding"),
      acceptCharset: request.headers.get("accept-charset"),
      cacheControl: request.headers.get("cache-control"),
      connection: request.headers.get("connection"),
      dnt: request.headers.get("dnt"),
      upgradeInsecure: request.headers.get("upgrade-insecure-requests"),
      // Referrer and Session
      referrer: referrer || null,
      referrerDomain: referrerDomain || null,
      sessionId,
      fingerprint,
      // Request Details
      requestMethod: request.method,
      requestUrl: request.url,
      requestPath: url.pathname,
      queryParams: JSON.stringify(Object.fromEntries(url.searchParams)),
      protocol: url.protocol,
      port: url.port ? parseInt(url.port) : null,
      createdAt: /* @__PURE__ */ new Date()
    };
    return metadata;
  } catch (error) {
    throw new Error("Error collecting analytics data");
  }
}

// src/metadata/geolocation.ts
var FetchGeolocation = class {
  ips = /* @__PURE__ */ new Set();
  failedIPs = /* @__PURE__ */ new Set();
  isProcessing = false;
  lastRequestTime = 0;
  requestCount = 0;
  RATE_LIMIT_WINDOW = 6e4;
  MAX_REQUESTS_PER_MINUTE = 45;
  debug = false;
  currentErrors = /* @__PURE__ */ new Map();
  setDebug(enabled) {
    this.debug = enabled;
  }
  debugLog(message) {
    if (this.debug) console.log(message);
  }
  debugUpdate(message) {
    if (this.debug) {
      const maxLength = 80;
      const truncated = message.length > maxLength ? message.substring(0, maxLength - 3) + "..." : message;
      process.stdout.write("\r" + truncated);
    }
  }
  debugComplete(message) {
    if (this.debug) {
      process.stdout.write("\r" + " ".repeat(100) + "\r" + message + "\n");
    }
  }
  debugError(ip, error, clear = false) {
    if (!this.debug) return;
    if (clear) {
      this.currentErrors.delete(ip);
    } else {
      const currentError = this.currentErrors.get(ip);
      if (currentError === error) return;
      this.currentErrors.set(ip, error);
    }
    if (this.currentErrors.size > 0) {
      const errorEntries = Array.from(this.currentErrors.entries());
      const maxDisplay = 3;
      const displayErrors = errorEntries.slice(0, maxDisplay);
      const remainingCount = errorEntries.length - maxDisplay;
      let errorText = displayErrors.map(([ip2, err]) => `${ip2}(${err})`).join(", ");
      if (remainingCount > 0) {
        errorText += `, +${remainingCount} more`;
      }
      process.stdout.write("\r" + " ".repeat(100) + "\r");
      this.debugUpdate(`\u274C ${errorText}`);
    } else {
      process.stdout.write("\r" + " ".repeat(100) + "\r");
    }
  }
  addIPs(ips) {
    for (const ip of ips) {
      if (this.isValidIP(ip)) {
        this.ips.add(ip);
        this.failedIPs.delete(ip);
      }
    }
  }
  addIP(ip) {
    if (this.isValidIP(ip)) {
      this.ips.add(ip);
      this.failedIPs.delete(ip);
    }
  }
  getIPs() {
    return Array.from(this.ips);
  }
  getFailedIPs() {
    return Array.from(this.failedIPs);
  }
  clearIPs() {
    this.ips.clear();
    this.failedIPs.clear();
  }
  clearSuccessfulIPs() {
    this.ips.clear();
  }
  isValidIP(ip) {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) || /^([0-9a-fA-F:]+)$/.test(ip);
  }
  async waitForRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest > this.RATE_LIMIT_WINDOW) {
      this.requestCount = 0;
    }
    if (this.requestCount >= this.MAX_REQUESTS_PER_MINUTE) {
      const waitTime = this.RATE_LIMIT_WINDOW - timeSinceLastRequest;
      if (waitTime > 0) {
        await this.sleepWithCountdown(waitTime, this.requestCount, this.MAX_REQUESTS_PER_MINUTE);
        this.requestCount = 0;
        if (this.debug) {
          process.stdout.write("\r" + " ".repeat(100) + "\r");
        }
      } else {
        this.requestCount = 0;
      }
    }
  }
  sleep(ms) {
    return new Promise((resolve2) => setTimeout(resolve2, ms));
  }
  async sleepWithCountdown(totalMs, usedRequests, maxRequests) {
    return new Promise((resolve2) => {
      const startTime = Date.now();
      let lastDisplayedSeconds = -1;
      const updateCountdown = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, totalMs - elapsed);
        const remainingSeconds = Math.ceil(remaining / 1e3);
        if (remaining <= 0) {
          clearInterval(interval);
          if (this.debug) {
            process.stdout.write("\r" + " ".repeat(100) + "\r");
            this.debugComplete(`\u2705 Rate limit reset, continuing...`);
          }
          resolve2();
          return;
        }
        if (remainingSeconds !== lastDisplayedSeconds) {
          lastDisplayedSeconds = remainingSeconds;
          const totalSeconds = Math.ceil(totalMs / 1e3);
          const progressPercent = Math.round((totalSeconds - remainingSeconds) / totalSeconds * 100);
          const progressBar = "\u2588".repeat(Math.floor(progressPercent / 5)) + "\u2591".repeat(20 - Math.floor(progressPercent / 5));
          this.debugUpdate(`\u23F3 Rate limit: ${remainingSeconds}s [${progressBar}] ${progressPercent}%`);
        }
      };
      updateCountdown();
      const interval = setInterval(updateCountdown, 200);
      setTimeout(() => {
        clearInterval(interval);
        if (this.debug) {
          process.stdout.write("\r" + " ".repeat(100) + "\r");
          this.debugComplete(`\u2705 Rate limit reset, continuing...`);
        }
        resolve2();
      }, totalMs);
    });
  }
  async processIP(ip, timeout, maxRetries) {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        await this.waitForRateLimit();
        this.requestCount++;
        this.lastRequestTime = Date.now();
        const adjustedTimeout = timeout + attempts * 2e3;
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timeout")), adjustedTimeout);
        });
        const data = await Promise.race([
          getLocationFromIP(ip),
          timeoutPromise
        ]);
        this.debugError(ip, "", true);
        this.ips.delete(ip);
        this.failedIPs.delete(ip);
        return { ip, data };
      } catch (error) {
        attempts++;
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        this.debugError(ip, `${errorMsg} (${attempts}/${maxRetries})`);
        if (attempts >= maxRetries) {
          this.failedIPs.add(ip);
          return { ip, error: `${errorMsg} (${maxRetries} attempts)` };
        }
        await this.sleep(Math.min(1e3 * Math.pow(2, attempts), 5e3));
      }
    }
    this.failedIPs.add(ip);
    return { ip, error: "Max retries exceeded" };
  }
  async bulkRequest(options = {}) {
    const {
      batchSize = 40,
      batchDelay = 65e3,
      autoRetry = true,
      maxAutoRetries = 2,
      debug = false
    } = options;
    let requestTimeout = options.requestTimeout || 1e4;
    let maxRetries = options.maxRetries || 2;
    this.debug = debug;
    if (this.isProcessing) {
      throw new Error("Bulk request already in progress");
    }
    this.isProcessing = true;
    const startTime = Date.now();
    const allIPs = this.getIPs();
    const result = {
      success: [],
      failed: [],
      stats: {
        total: allIPs.length,
        successful: 0,
        failed: 0,
        duration: 0,
        batchesProcessed: 0
      }
    };
    try {
      this.currentErrors.clear();
      let currentRetryRound = 0;
      while (currentRetryRound <= maxAutoRetries) {
        const currentIPs = this.getIPs();
        if (currentIPs.length === 0) break;
        if (currentRetryRound > 0 && debug) {
          this.debugLog(`\u{1F504} Auto-retry ${currentRetryRound}/${maxAutoRetries}: ${currentIPs.length} IPs`);
        }
        const batches = [];
        for (let i = 0; i < currentIPs.length; i += batchSize) {
          batches.push(currentIPs.slice(i, i + batchSize));
        }
        if (currentRetryRound === 0 && debug) {
          this.debugLog(`\u{1F680} Processing ${currentIPs.length} IPs in ${batches.length} batches`);
        }
        for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
          const batch = batches[batchIndex];
          const batchStartTime = Date.now();
          if (debug) {
            this.debugUpdate(`\u{1F4E6} Batch ${batchIndex + 1}/${batches.length}...`);
          }
          const batchResults = await Promise.all(
            batch.map((ip) => this.processIP(ip, requestTimeout, maxRetries))
          );
          for (const batchResult of batchResults) {
            if (batchResult.error) {
              const existingFailed = result.failed.find((f) => f.ip === batchResult.ip);
              if (!existingFailed) {
                result.failed.push({
                  ip: batchResult.ip,
                  error: batchResult.error
                });
              }
            } else if (batchResult.data) {
              result.failed = result.failed.filter((f) => f.ip !== batchResult.ip);
              const existingSuccess = result.success.find((s) => s.ip === batchResult.ip);
              if (!existingSuccess) {
                result.success.push({
                  ip: batchResult.ip,
                  data: batchResult.data
                });
              }
            }
          }
          result.stats.batchesProcessed++;
          const batchDuration = Date.now() - batchStartTime;
          if (debug) {
            this.debugComplete(`\u2705 Batch ${batchIndex + 1}/${batches.length} (${batchDuration}ms)`);
          }
          if (this.debug && this.currentErrors.size > 0) {
            this.debugUpdate("");
          }
          if (batchIndex < batches.length - 1) {
            await this.sleep(batchDelay);
          }
        }
        if (!autoRetry || this.failedIPs.size === 0) break;
        currentRetryRound++;
        if (currentRetryRound <= maxAutoRetries) {
          requestTimeout = Math.min(requestTimeout * 1.5, 15e3);
          maxRetries = Math.min(maxRetries + 1, 4);
          const failedIPsArray = Array.from(this.failedIPs);
          this.addIPs(failedIPsArray);
          await this.sleep(1e3);
        }
      }
      this.currentErrors.clear();
      if (this.debug) {
        this.debugUpdate("");
      }
      result.stats.successful = result.success.length;
      result.stats.failed = result.failed.length;
      result.stats.duration = Date.now() - startTime;
      if (debug) {
        this.debugLog(`\u{1F3AF} Completed: ${result.stats.successful}/${result.stats.total} (${result.stats.duration}ms)`);
      }
    } catch (error) {
      console.error("\u274C Bulk request failed:", error);
      throw error;
    } finally {
      this.isProcessing = false;
      this.debug = false;
    }
    return result;
  }
  async retryFailedIPs(options = {}) {
    if (this.failedIPs.size === 0) {
      throw new Error("No failed IPs to retry");
    }
    const failedIPsArray = Array.from(this.failedIPs);
    this.addIPs(failedIPsArray);
    return this.bulkRequest(options);
  }
  getStats() {
    return {
      totalIPs: this.ips.size,
      failedIPs: this.failedIPs.size,
      isProcessing: this.isProcessing,
      lastRequestTime: this.lastRequestTime ? new Date(this.lastRequestTime) : null,
      requestCount: this.requestCount
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchGeolocation,
  IOF,
  Logger,
  Terminal,
  TerminalColors,
  Time,
  UAParser,
  collectAnalytics,
  getLocationFromIP,
  mimeType,
  terminal
});
//# sourceMappingURL=index.js.map