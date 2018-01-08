'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
      'Welcome to the groovy ' + chalk.red('@hspkg/generator-rc') + ' generator!'
    ));

    const validate = input => !!input;

    const prompts = [
      {
        name: 'name',
        message: 'The name of the project:',
        validate,
      },
      {
        name: 'desc',
        message: 'The description of the project:',
        validate,
      },
      {
        name: 'author',
        message: 'The author:',
        validate,
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('**/*'),
      this.destinationRoot(),
      { globOptions: { dot: true } },
    );

    ['README.md', 'package.json', 'LICENSE'].forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.props,
      );
    });
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
    }).then(() => console.log(chalk.green('Everything is ready!')));
  }
};
