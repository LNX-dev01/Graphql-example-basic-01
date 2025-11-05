import chalk from "chalk"

/**
 * Muestra un mensaje dentro de un banner decorativo
 * @param message Show a message
 * @param color Optional color(default: "blue")
 */
type ChalkColor = "red" | "green" | "blue" | "yellow" | "magenta" | "cyan" | "white";

export  function logBanner(message: string, color?: ChalkColor) {
  const line = "*".repeat(message.length + 6);

  const chalkMap: Record<ChalkColor, (text: string) => string> = {
    red: chalk.red,
    green: chalk.green,
    blue: chalk.blue,
    yellow: chalk.yellow,
    magenta: chalk.magenta,
    cyan: chalk.cyan,
    white: chalk.white,
  };
  const chalkColor = chalkMap[color ?? "blue"];

  console.log(chalkColor(line));
  console.log(chalkColor(`|* ${message} *|`));
  console.log(chalkColor(line));
}
