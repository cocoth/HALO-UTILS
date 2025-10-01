import { FSWatcherKnownEventMap } from 'chokidar';
import dotenv from 'dotenv';

/**
 * TerminalColor type definitions for ANSI escape codes and color functions.
 * These types describe the structure and usage of terminal color codes and functions.
 * @see {@link https://en.wikipedia.org/wiki/ANSI_escape_code} for more information
 */
type TerminalColor = {
    /** Resets all styles and colors to default. */
    _reset: string;
    /** Makes the text bright. */
    _bright: string;
    /** Makes the text dim. */
    _dim: string;
    /** Makes the text italic. */
    _italic: string;
    /** Underlines the text. */
    _underline: string;
    /** Makes the text blink. */
    _blink: string;
    /** Reverses the foreground and background colors. */
    _reverse: string;
    /** Hides the text. */
    _hidden: string;
    /** Strikes through the text. */
    _strikethrough: string;
    /** Sets the text color to black. */
    BLACK: string;
    /** Sets the text color to red. */
    RED: string;
    /** Sets the text color to green. */
    GREEN: string;
    /** Sets the text color to yellow. */
    YELLOW: string;
    /** Sets the text color to blue. */
    BLUE: string;
    /** Sets the text color to magenta. */
    MAGENTA: string;
    /** Sets the text color to cyan. */
    CYAN: string;
    /** Sets the text color to white. */
    WHITE: string;
    /** Sets the text color to bright black (gray). */
    BRIGHT_BLACK: string;
    /** Sets the text color to bright red. */
    BRIGHT_RED: string;
    /** Sets the text color to bright green. */
    BRIGHT_GREEN: string;
    /** Sets the text color to bright yellow. */
    BRIGHT_YELLOW: string;
    /** Sets the text color to bright blue. */
    BRIGHT_BLUE: string;
    /** Sets the text color to bright magenta. */
    BRIGHT_MAGENTA: string;
    /** Sets the text color to bright cyan. */
    BRIGHT_CYAN: string;
    /** Sets the text color to bright white. */
    BRIGHT_WHITE: string;
    /** Sets the background color to black. */
    BBLACK: string;
    /** Sets the background color to red. */
    BRED: string;
    /** Sets the background color to green. */
    BGREEN: string;
    /** Sets the background color to yellow. */
    BYELLOW: string;
    /** Sets the background color to blue. */
    BBLUE: string;
    /** Sets the background color to magenta. */
    BMAGENTA: string;
    /** Sets the background color to cyan. */
    BCYAN: string;
    /** Sets the background color to white. */
    BWHITE: string;
    /** Sets the background color to bright black. */
    BBRIGHT_BLACK: string;
    /** Sets the background color to bright red. */
    BBRIGHT_RED: string;
    /** Sets the background color to bright green. */
    BBRIGHT_GREEN: string;
    /** Sets the background color to bright yellow. */
    BBRIGHT_YELLOW: string;
    /** Sets the background color to bright blue. */
    BBRIGHT_BLUE: string;
    /** Sets the background color to bright magenta. */
    BBRIGHT_MAGENTA: string;
    /** Sets the background color to bright cyan. */
    BBRIGHT_CYAN: string;
    /** Sets the background color to bright white. */
    BBRIGHT_WHITE: string;
    /**
     * Sets foreground color using 256-color palette.
     * @param n - Color number (0-255)
     * @returns ANSI escape code for 256-color foreground
     */
    fg256: (n: number) => string;
    /**
     * Sets background color using 256-color palette.
     * @param n - Color number (0-255)
     * @returns ANSI escape code for 256-color background
     */
    bg256: (n: number) => string;
    /**
     * Sets foreground color using RGB values.
     * @param r - Red value (0-255)
     * @param g - Green value (0-255)
     * @param b - Blue value (0-255)
     * @returns ANSI escape code for RGB foreground color
     */
    fgRGB: (r: number, g: number, b: number) => string;
    /**
     * Sets background color using RGB values.
     * @param r - Red value (0-255)
     * @param g - Green value (0-255)
     * @param b - Blue value (0-255)
     * @returns ANSI escape code for RGB background color
     */
    bgRGB: (r: number, g: number, b: number) => string;
};
/**
 * FileType namespace contains type definitions related to file handling.
 */
declare namespace FileType {
    /**
     * Represents a file with its data, name, and path.
     *   @property filedata - The binary data of the file.
     *   @property filename - The name of the file.
     *   @property filepath - The path where the file is stored.
     */
    interface FileData {
        filedata: Buffer;
        filename: string;
        filepath: string;
    }
    /**
     * Represents the metadata of a file stored in the system.
     *  @property filename - The name of the file.
     *  @property fileuri - The URI where the file is stored.
     *  @property filehash - The SHA-256 hash of the file.
     *  @property filesize - The size of the file in bytes.
     *  @property filetype - The MIME type of the file.
     */
    interface FileMetadata {
        filename: string;
        fileuri: string;
        filehash: string;
        filesize: number;
        mimeType: string;
        inlineData: string;
    }
    /**
     * Represents the data required to download a file from a URL.
     *   @property fileuri - The URL of the file to download.
     *   @property saveTo - The local path where the file should be saved.
     */
    interface FileDownloadRequest {
        fileuri: string;
        saveTo: string;
    }
    /**
     * Represents the data required to upload a file inline.
     *   @property inlineData - The base64 encoded string of the file content.
     *   @property mimeType - The MIME type of the file.
     */
    interface InlineData {
        inlineData: string;
        mimeType: string;
    }
}
/**
 * LogReturn interface represents the structure of a log entry returned by the Logger class.
 * It includes the function name (if applicable), timestamp, message, and log level.
 */
interface LogReturn {
    /**
     * The name of the function from which the log was called.
     * This property is optional and only present if the log was made using the function-aware logging methods (e.g., Logger.pfn.info).
     */
    pfn: string;
    /**
     * The timestamp when the log entry was created, formatted as "DD/MM/YYYY:HH:MM:SS".
     */
    timestamp: string;
    /**
     * The actual log message. This can be of any type, including strings, objects, or arrays.
     * The type of this property is preserved from the input to the logging method.
     */
    message: any;
    /**
     * The severity level of the log entry (e.g., "INFO", "WARN", "ERROR").
     */
    level: string;
}

/**
 * IOF (Input/Output File) class provides methods for file and directory operations,
 * including creating directories, removing files, watching directories for changes,
 * reading and writing JSON files, calculating file hashes and sizes, and saving files.
 */
declare class IOF {
    /**
     * Checks if a file exists at the specified path.
     * @param filePath - The path to the file.
     * @returns A boolean indicating whether the file exists.
     * @throws An error if the existence check fails.
     */
    static existsFileSync(filePath: string): boolean;
    /**
     * Asynchronously checks if a file exists at the specified path.
     * @param filePath - The path to the file.
     * @returns A promise that resolves to a boolean indicating whether the file exists.
     * @throws An error if the existence check fails.
     */
    static existsFile(filePath: string): Promise<boolean>;
    /**
     * Creates a directory if it does not exist.
     * @param dirPath - The path of the directory to create.
     */
    static mkdir(dirPath: string): void;
    /**
     * Removes a directory or file at the specified path.
     * If the path is a directory, it will be removed recursively.
     * @param dirPath - The path of the directory to remove.
     */
    static rm(dirPath: string): void;
    /**
     * Watches a directory for file system events and executes a callback with the event details.
     * @param options - The options for the watcher.
     * @param options.dirPath - The path of the directory to watch.
     * @param options.event - The type of event to listen for (e.g., "add", "change", "unlink").
     * @param options.onEvent - Optional callback function to handle file system events.
     *
     */
    static watcher(options: {
        /**
         * The path of the directory to watch.
         */
        dirPath: string;
        /**
         * The type of event to listen for.
         */
        event: keyof FSWatcherKnownEventMap | "add" | "change" | "addDir" | "unlink" | "unlinkDir";
        /**
         * Optional callback function to handle file system events.
         */
        onEvent?: (args: {
            /**
             * The full path of the file that triggered the event.
             */
            filePath: string;
            /**
             * The type of event that occurred.
             */
            event: keyof FSWatcherKnownEventMap | "add" | "change" | "addDir" | "unlink" | "unlinkDir";
        }) => Promise<void>;
    }): void;
    /**
     * Writes data to a JSON file. Can either append to existing array or overwrite the file.
     * @param filePath - The path to the JSON file.
     * @param data - The data to write to the file (single object or array).
     * @param overwrite - If true, overwrites the file. If false, appends to existing array. Default is false.
     * @throws An error if the file cannot be written or if the content is not an array.
     */
    static writeJSONFile<T>(params: {
        filePath: string;
        data: T | T[];
        overwrite?: boolean;
    }): Promise<void>;
    /**
     * Reads a JSON file and returns its content as an array.
     * @param filePath - The path to the JSON file.
     * @returns An array of objects parsed from the JSON file.
     * @throws An error if the file does not exist or if the content is not an array.
     */
    static readJSONFile<T>(filePath: string): Promise<T[]>;
    /**
     * Calculates the SHA-256 hash of a given buffer.
     * @param buffer - The buffer to hash.
     * @returns The SHA-256 hash as a hexadecimal string.
     */
    static calculateHashByBuffer(buffer: Buffer): string;
    /**
     * Calculates the size of a file based on its buffer.
     * @param buffer - The buffer representing the file.
     * @returns The size of the file in bytes.
     */
    static calculateSizeByBuffer(buffer: Buffer): number;
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
    saveBufferToFile(data: FileType.FileData): Promise<FileType.FileMetadata | null>;
    /**
     * Downloads a file from a given URL and saves it to the specified download path.
     * @param data - The file download data including the file URL and save path.
     * @returns The metadata of the downloaded file.
     */
    static downloadFile(data: FileType.FileDownloadRequest): Promise<FileType.FileMetadata>;
    /**
     * Retrieves the string content of a text file.
     * @param filePath - The path to the text file.
     * @returns A promise that resolves to the content of the file as a string.
     * @throws An error if the file cannot be read.
     */
    static readTextFile(filePath: string): Promise<string>;
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
    fileToGenerativePath(fileName: string): Promise<{
        inlineData: {
            data: string;
            mimeType: string;
        };
    }>;
}

declare function mimeType(fileName: string): "video/mp4" | "video/mpeg" | "video/webm" | "video/3gpp" | "video/x-matroska" | "video/x-msvideo" | "video/quicktime" | "video/x-ms-wmv" | "video/x-flv" | "video/x-m4v" | "audio/mpeg" | "audio/mp4" | "audio/wav" | "audio/ogg" | "audio/aac" | "audio/flac" | "audio/alac" | "image/jpeg" | "image/png" | "image/gif" | "image/bmp" | "image/webp" | "image/svg+xml" | "image/x-icon" | "image/tiff" | "image/vnd.adobe.photoshop" | "application/postscript" | "application/x-indesign" | "image/x-raw" | "image/x-canon-cr2" | "image/x-nikon-nef" | "image/x-olympus-orf" | "image/x-panasonic-rw2" | "image/x-pentax-pef" | "image/x-sony-arw" | "image/x-adobe-dng" | "image/x-sigma-x3f" | "image/x-canon-cr3" | "image/heic" | "image/heif" | "image/avif" | "application/pdf" | "text/plain" | "text/html" | "text/css" | "application/javascript" | "application/json" | "application/xml" | "application/zip" | "application/x-rar-compressed" | "application/x-7z-compressed" | "application/octet-stream";

/**
 * Utility functions for terminal colors.
 * These functions provide ANSI escape codes for styling terminal output.
 * @module TerminalColors
 * This module exports an object containing ANSI escape codes for various text styles and colors.
 * You can use these codes to format terminal output in Node.js applications.
 * @example
 * import { TerminalColors as TC } from '@/shared/utils/colors';
 * console.log(`${TC.RED}This text is red${TC._reset}`);
 * @see {@link https://en.wikipedia.org/wiki/ANSI_escape_code} for more information
 */
declare const TerminalColors: TerminalColor;

/**
 * Logger class provides static methods for logging messages to the console with different severity levels.
 *
 * It supports the following log levels:
 * - DEBUG
 * - WARN
 * - ERROR
 * - INFO
 * - SUCCESS
 *
 * each with distinct colors for better visibility.
 * The logger also includes a custom log method that allows specifying a type and color.
 * Each log entry is timestamped and can optionally include the name of the function from which it was called.
 */
declare class Logger {
    /**
     * Flag to control whether to show function names in regular Logger methods
     * Set to false by default - use Logger.pfn for function names
     */
    static showFunctionName: boolean;
    /**
     * Proxy object for logging with function names
     */
    static pfn: {
        success: (...args: any[]) => LogReturn;
        error: (...args: any[]) => LogReturn;
        warn: (...args: any[]) => LogReturn;
        info: (...args: any[]) => LogReturn;
        debug: (...args: any[]) => LogReturn;
        custom: (opt: {
            type: string;
            color?: keyof typeof TerminalColors;
        }, ...args: any[]) => LogReturn;
    };
    private static getCallerName;
    private static getCallerNameForced;
    private static log;
    private static logWithReturn;
    /**
     * Logs a success message.
     * @param args - The messages to log.
     * @returns LogReturn object with structured data
     */
    static success(...args: any[]): LogReturn;
    /**
     * Logs an error message.
     * @param args - The messages to log.
     * @returns LogReturn object with structured data
     */
    static error(...args: any[]): LogReturn;
    /**
     * Logs a warning message.
     * @param args - The messages to log.
     * @returns LogReturn object with structured data
     */
    static warn(...args: any[]): LogReturn;
    /**
     * Logs an informational message.
     * @param args - The messages to log.
     * @returns LogReturn object with structured data
     */
    static info(...args: any[]): LogReturn;
    /**
     * Logs a debug message.
     * @param args - The messages to log.
     * @returns LogReturn object with structured data
     */
    static debug(...args: any[]): LogReturn;
    /**
     * Custom log method that allows specifying a type and color.
     * @param opt - Options for the custom log.
     * @param args - The messages to log.
     * @returns LogReturn object with structured data
     */
    static custom(opt: {
        type: string;
        color?: keyof typeof TerminalColors;
    }, ...args: any[]): LogReturn;
    private static customWithReturn;
}

/**
 * Terminal class provides methods for interacting with the terminal.
 * It includes functionalities for prompting user input, clearing the screen,
 * pausing execution, and parsing environment variables.
 */
declare class Terminal {
    private static instance;
    private readlineInterface;
    constructor();
    getInstance(): Terminal;
    /**
     * Prompts the user for input and returns the response.
     * @param question The question to ask the user.
     * @returns A promise that resolves to the user's input.
     */
    question(question?: string): Promise<string>;
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
    close(code?: number): void;
    /**
     * Prompts the user for input without a specific question.
     * This function is useful for creating a prompt without a predefined question.
     * It simply displays a prompt symbol (": ") and waits for user input.
     */
    prompt(): void;
    /**
     * Clears the terminal screen.
     * @returns A promise that resolves to the user's input.
     */
    clear(): void;
    /**
     * Pauses execution for a specified duration (in seconds), similar to Python's sleep.
     * @param duration Duration in seconds
     */
    sleep(duration: number): Promise<void>;
    /**
     * Parses environment variables that start with a given prefix.
     * @param prefix The prefix to filter environment variables.
     * @param options Optional dotenv configuration options.
     * @returns An object containing arrays of keys and values.
     */
    envParser(prefix: string, options?: dotenv.DotenvConfigOptions): {
        keys: string[];
        values: string[];
    };
}
/**
 * Singleton instance of the Terminal class.
 * You can use this instance to interact with the terminal throughout your application.
 */
declare const terminal: Terminal;

/**
 * Time utility class for handling date and time formatting.
 * This class provides methods to format dates in various ways, including human-readable formats,
 * ISO strings, and formats suitable for logging or saving to a database.
 */
declare class Time {
    private static formatDateToParts;
    private static formatDateString;
    /**
     * Gets the timezone offset string for a given timezone
     */
    private static getTimezoneOffset;
    private static formatDateToSaveString;
    private static logFormat;
    /**
     * Validates if a timezone is supported
     */
    static isValidTimeZone(timeZone: string): boolean;
    /**
     * Validates if a locale is supported
     */
    static isValidLocale(locale: string): boolean;
    /**
     * Gets the system's default timezone
     */
    static getSystemTimezone(): string;
    /**
     * Gets the system's default locale
     */
    static getSystemLocale(): string;
    /**
     * Gets both system locale and timezone
     */
    static getSystemLocaleAndTimezone(): {
        locale: string;
        timeZone: string;
    };
    /**
     * Formats a date to a human-readable string using locale-specific formatting.
     * @param data Object containing date, locale, and timeZone
     * @returns The formatted date string respecting locale conventions
     */
    static formatDateToHumanReadable(data: {
        date?: Date;
        locale?: string | null;
        timeZone?: string | null;
    }): string;
    /**
     * Returns the current time formatted as a string suitable for saving.
     * This format is `YYYY-MM-DDTHH-MM-SSZ`, which is useful for file naming or database storage.
     */
    static getCurrentTimeToSaveString(locale?: string | null, timeZone?: string | null): string;
    /**
     * Returns the current time as a Date object in the specified timezone.
     * Note: This returns a new Date object representing the current moment,
     * but when displayed it will show the time in the specified timezone.
     */
    static getCurrentTime(locale?: string | null, timeZone?: string | null): Date;
    /**
     * Returns the current time formatted as a string.
     * This format includes proper timezone information (Z for UTC, +HH:MM for others).
     */
    static getCurrentTimeToString(locale?: string | null, timeZone?: string | null): string;
    /**
     * Returns the current time in a human-readable format.
     * This format is `DD/MM/YYYY HH:MM:SS`, which is suitable for display to users.
     */
    static getCurrentTimeToHumanReadable(locale?: string | null, timeZone?: string | null): string;
    /**
     * Safely parses a date string or date object
     */
    static parseDate(input: string | Date | number): Date;
    /**
     * Returns the current time formatted for logging.
     * This format is `DD/MM/YYYY:HH:MM:SS`, which is useful for log entries.
     */
    static getTimeToLogFormat(locale?: string | null, timeZone?: string | null): string;
}

export { FileType, IOF, type LogReturn, Logger, Terminal, type TerminalColor, TerminalColors, Time, mimeType, terminal };
