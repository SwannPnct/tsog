import ts from "typescript"
import { readFileSync } from "fs";
import path from "path";
import { findStatementByName, getMembers } from "./helpers/looker";
import { generateMember } from "./helpers/generator";

const typeFile = 'src/type.d.ts'

export const generate = (targetName: string): Record<any, any> => {
  const generated = {}

  const data = readFileSync(path.resolve(typeFile), { encoding: 'utf-8' })
  const file = ts.createSourceFile('src.ts', data, ts.ScriptTarget.Latest)

  const node = findStatementByName(file, targetName)

  if (!node) throw new Error(`Unable to find the type or interface for "${targetName}"`)

  const members = getMembers(node)

  console.log(members)

  if (!members) throw new Error(`Unable to find any members for "${targetName}"`)

  members.forEach((member) => {
    generateMember(generated, member)
  })

  return generated
}

console.log(generate('OptionalObjectType'))
