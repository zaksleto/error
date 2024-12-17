import React from 'react';
import type { ChangeEvent, FC, HTMLAttributes } from 'react';
import {
    BtnBold,
    BtnItalic,
    Editor,
    EditorProvider,
    Toolbar,
    useEditorState,
    EditorState,
    ContentEditableEvent,
    BtnBulletList,
    BtnClearFormatting,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
  } from 'react-simple-wysiwyg';

// Create a font size dropdown
export const BtnFontSize = createDropdown('Font Size', [
  ['Pequeno', 'fontSize', '1'], // '1' = smallest font size
  ['Menor', 'fontSize', '2'], // '3' = default size
  ['Normal', 'fontSize', '3'], // '3' = default size
  ['Grande', 'fontSize', '5'], // '5' = larger font size
  ['SUPER', 'fontSize', '7'], // '7' = largest font size
]);

export function createDropdown(
  title: string,
  items: DropDownItem[],
): FC<DropDownFactoryProps> {
  DropdownFactory.displayName = title;

  return DropdownFactory;

  function DropdownFactory(props: DropDownFactoryProps) {
    const editorState = useEditorState();
    const { $el, htmlMode } = editorState;

    if (htmlMode) {
      return null;
    }

    return (
      <Dropdown
        {...props}
        items={items}
        onChange={onChange}
        tabIndex={-1}
        title={title}
      />
    );

    function onChange(e: ChangeEvent<HTMLSelectElement>) {
      const selectedValue = e.target.value;
      const [, command, commandArgument] = items[parseInt(selectedValue, 10)] || [];

      e.preventDefault();

      if (document.activeElement !== $el) {
        $el?.focus();
      }

      if (typeof command === 'function') {
        command(editorState);
      } else if (command) {
        document.execCommand(command, false, commandArgument);
      }
    }
  }
}

export function Dropdown({ items, ...inputProps }: DropdownProps) {
  return (
    <select {...inputProps} className="rsw-dd">
      <option hidden>{inputProps.title}</option>
      {items.map((item, index) => (
        <option key={item[2]} value={index}>
          {item[0]}
        </option>
      ))}
    </select>
  );
}

export type DropDownItem = [
  string,
  string | ((editorState: EditorState) => void),
  string,
];

export interface DropDownFactoryProps
  extends HTMLAttributes<HTMLSelectElement> {
  selected?: number;
}

export interface DropdownProps extends DropDownFactoryProps {
  items: DropDownItem[];
}

// Editor with custom toolbar

export default function CustomEditor({ value, onChange }: {
    value: string
    onChange: (value: ContentEditableEvent) => void
}) {
  return (
    <EditorProvider>
      <Editor value={value} onChange={onChange}>
        <Toolbar>
        <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <HtmlButton />
          <Separator />
          <BtnFontSize />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}
