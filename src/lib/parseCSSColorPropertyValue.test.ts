import { describe, expect, it } from "@jest/globals";
import { parseCSSColorPropertyValue } from "./parseCSSColorPropertyValue";

describe("parseCSSColorPropertyValue", () => {
  it("parses the color in HEX format with 3 digits", () => {
    const color = parseCSSColorPropertyValue("#f71");

    expect(color).toEqual({
      r: 255,
      g: 119,
      b: 17,
    });
  });

  it("parses the color in HEX format with 3 digits with zeros", () => {
    const color = parseCSSColorPropertyValue("#f00");

    expect(color).toEqual({
      r: 255,
      g: 0,
      b: 0,
    });
  });

  it("parses the color in HEX format with 6 digits", () => {
    expect(parseCSSColorPropertyValue("#ff7711")).toEqual({
      r: 255,
      g: 119,
      b: 17,
    });
  });

  it("parses the color in HEX format with 6 digits with zeros", () => {
    expect(parseCSSColorPropertyValue("#ff0000")).toEqual({
      r: 255,
      g: 0,
      b: 0,
    });
  });

  it("parses the color in RGB function format", () => {
    expect(parseCSSColorPropertyValue("rgb(255, 0, 0)")).toEqual({
      r: 255,
      g: 0,
      b: 0,
    });
  });

  it("parses the color in RGBA function format", () => {
    expect(parseCSSColorPropertyValue("rgba(255, 0, 0, 1)")).toEqual({
      r: 255,
      g: 0,
      b: 0,
      a: 1,
    });
  });

  it("parses the color in RGB function format with percentage", () => {
    expect(parseCSSColorPropertyValue("rgb(100%, 0%, 0%)")).toEqual({
      r: 255,
      g: 0,
      b: 0,
    });
  });

  it("parses the color in RGBA function format with percentage", () => {
    expect(parseCSSColorPropertyValue("rgba(100%, 0%, 0%, 100%)")).toEqual({
      r: 255,
      g: 0,
      b: 0,
      a: 1,
    });
  });

  it("parses the color in RGB function format with spaces instead of commas", () => {
    expect(parseCSSColorPropertyValue("rgb(255 0 0)")).toEqual({
      r: 255,
      g: 0,
      b: 0,
    });
  });

  it("parses the color in RGBA function format with spaces instead of commas", () => {
    expect(parseCSSColorPropertyValue("rgba(255 0 0 1)")).toEqual({
      r: 255,
      g: 0,
      b: 0,
      a: 1,
    });
  });
});
