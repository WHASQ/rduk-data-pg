/**
 * MIT License
 *
 * Copyright (c) 2016 - 2018 RDUK <tech@rduk.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict'

const data = require('@rduk/data')
const DefaultQueryProvider = require('@rduk/data/lib/query/default')
const PostgreSQLExpressionTranslator = require('./translator')

class PostgreSQLQueryProvider extends DefaultQueryProvider {
  constructor (ExpressionVisitor) {
    super(ExpressionVisitor, PostgreSQLExpressionTranslator)
  }
  execute (expression, context) {
    let command = this.getCommand(expression, context)
    let parameters = []

    let index = 1
    command = command.replace(/\?<([^>]+)>/gi, function (result, match) {
      parameters.push(context[match])
      return '$' + index++
    })

    return data.getInstance().execute(command, parameters)
  }
}

module.exports = PostgreSQLQueryProvider
