import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs/promises';
import { createWriteStream } from 'fs';

async function generateQRCode() {
  try {
    const answers = await inquirer.prompt([
      { message: 'Type in your URL here: ', name: 'URL' }
    ]);

    const url = answers.URL;
    const qr_svg = qr.image(url);

    qr_svg.pipe(createWriteStream('portfolioQR.png'));

    await fs.writeFile('myPortfolio.txt', url);
    console.log('File has been saved!');
  } catch (error) {
    if (error.isTtyError) {
      console.log('Error!');
    } else {
      console.log('An error occurred: ', error.message);
    };
  };
};

generateQRCode();
