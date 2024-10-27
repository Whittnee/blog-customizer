import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import React, { useState, useRef } from 'react';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultStyleValues,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';

type StylePropsType = typeof defaultStyleValues;
type ArticleParamsFormProps = {
	setStyleProps: React.Dispatch<React.SetStateAction<StylePropsType>>;
};

export const ArticleParamsForm = ({
	setStyleProps,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0]);
	const [fontSize, setFontSize] = useState(fontSizeOptions[0]);
	const [fontColor, setFontColor] = useState(fontColors[0]);
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	const [contentWidth, setContentWidth] = useState(contentWidthArr[0]);

	const styleValues = {
		'--font-family': fontFamily.value,
		'--font-size': fontSize.value,
		'--font-color': fontColor.value,
		'--container-width': contentWidth.value,
		'--bg-color': backgroundColor.value,
	};

	const resetFields = [
		{ setter: setFontFamily, defaultValue: fontFamilyOptions[0] },
		{ setter: setFontSize, defaultValue: fontSizeOptions[0] },
		{ setter: setFontColor, defaultValue: fontColors[0] },
		{ setter: setContentWidth, defaultValue: contentWidthArr[0] },
		{ setter: setBackgroundColor, defaultValue: backgroundColors[0] },
	];

	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: isFormOpen,
		onChange: setIsFormOpen,
		rootRef,
	});

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setIsFormOpen(!isFormOpen)}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setStyleProps(styleValues);
					}}
					onReset={(e) => {
						e.preventDefault();
						resetFields.forEach(({ setter, defaultValue }) =>
							setter(defaultValue)
						);
						setStyleProps(defaultStyleValues);
					}}>
					<Text size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={setFontFamily}
						title='шрифт'
					/>
					<RadioGroup
						name='radio'
						selected={fontSize}
						options={fontSizeOptions}
						onChange={setFontSize}
						title='размер шрифта'
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
						title='цвет фона'
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
