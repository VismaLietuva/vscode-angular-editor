import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import { openFileInVscode, workspaceFilePath } from '../helpers';

suite('AngularTsDefinitionProvider', () => {
  const componentFilePath = workspaceFilePath('foo.component.ts');

  suiteSetup(async () => {
    await openFileInVscode(componentFilePath);
  });

  test('should go to templateUrl declaration', async () => {
    const result = await vscode.commands.executeCommand<vscode.Location[]>('vscode.executeDefinitionProvider',
      vscode.Uri.file(componentFilePath), new vscode.Position(2, 22));

    assert.notEqual(result[0], undefined, 'file did not resolve');
    assert.equal(result[0].uri.fsPath, workspaceFilePath('foo.component.html'), 'wrong file resolution');
    assert.equal(result[0].range.start.line, 0, 'wrong line position');
    assert.equal(result[0].range.start.character, 0, 'wrong character position');
  });

  test('should go to styleUrls declaration', async () => {    
    const result = await vscode.commands.executeCommand<vscode.Location[]>('vscode.executeDefinitionProvider',
      vscode.Uri.file(componentFilePath), new vscode.Position(3, 22));

    assert.notEqual(result[0], undefined, 'file did not resolve');
    assert.equal(result[0].uri.fsPath, workspaceFilePath('foo.component.css'), 'wrong file resolution');
    assert.equal(result[0].range.start.line, 0, 'wrong line position');
    assert.equal(result[0].range.start.character, 0, 'wrong character position');
  });
});