import { exec } from 'child_process';
import { promisify } from 'util';
import readline from 'readline/promises';

const execAsync = promisify(exec);

async function generateMigration() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let invalidName = false;

  try {
    const name = await rl.question('\x1b[32mEnter migration name\x1b[0m\n');
    if (name !== '') {
      const {stdout, stderr} = await execAsync(`npm run migration:generate --name=${name}`);
    }
    
    invalidName = true;
  } catch (error) {
    console.error(error?.stdout ?? '');
  } finally {
    rl.close();
    if (invalidName) {
      console.error('Invalid migration name!\n');
      generateMigration();
    }
  }
}

generateMigration();