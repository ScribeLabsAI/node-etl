# node-etl

ETL pipeline and utilities for Node.

## Installation

`npm install @scribelabsai/etl`

## Usage

```typescript
const pipeline = new ETL()
  .extract(fromCSV('input.csv'))
  .transform(
    toJSON(),
    fanout([
      toConsole(),
      toFile('output.txt')
    ])
  )
  .load(toFile('secondOutput.txt')); // Redundant to show case the syntax

pipeline.start();
await pipeline.finished();
```
