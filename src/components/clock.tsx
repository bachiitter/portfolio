import { memo, useEffect, useState } from "react";

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: string) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Clock() {
  const [date, setDate] = useState(
    new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Vancouver",
      hourCycle: "h23",
    }),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const refreshClock = () =>
      setDate(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Vancouver",
          hourCycle: "h23",
        }),
      );

    const timerId = setInterval(refreshClock, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <span className="whitespace-nowrap small [font-feature-settings:'tnum']">
      {mounted ? date : "00:00:00"}{" "}
      <span aria-hidden className="select-none">
        ·
      </span>{" "}
      {getFlagEmoji("CA")} Vancouver, Canada
    </span>
  );
}
export default memo(Clock);