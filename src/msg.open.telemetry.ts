import { LogMessage, LogMessageOpenTelemetry } from './msg';

function severityToText(num: number): string {
  if (num < 5) return 'TRACE';
  if (num < 9) return 'DEBUG';
  if (num < 13) return 'INFO';
  if (num < 17) return 'WARN';
  if (num < 21) return 'ERROR';
  if (num < 25) return 'FATAL';

  return 'FATAL'; // TODO should this be defaulted
}

function normalizeLevel(num: number): number {
  if (num < 5) return 10;
  if (num < 9) return 20;
  if (num < 13) return 30;
  if (num < 17) return 40;
  if (num < 21) return 50;
  if (num < 25) return 60;
  return 60;
}

function normalizeTime(time: string | number): Date {
  const timeType = typeof time;
  if (timeType === 'number') return new Date(timeType);
  return new Date(parseFloat(timeType) / 10000000);
}

export const OpenTelemetryLogs = {
  normalizeLevel,
  severityToText,
  normalizeTime,

  isOtLog(msg: LogMessage): msg is LogMessageOpenTelemetry {
    const timeType = typeof msg.Timestamp;
    return timeType === 'number' || timeType === 'string';
  },
};
