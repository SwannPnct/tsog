import ts from "typescript";
import { getName } from "./looker";

export const generateString = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = `string-${Date.now()}`
}

export const generateNumber = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = Date.now()
}

export const generateBoolean = (generated: Record<any, any>, member: ts.Node) => {
    const probability = Math.random() * 100
    generated[getName(member)] = probability >= 49
}