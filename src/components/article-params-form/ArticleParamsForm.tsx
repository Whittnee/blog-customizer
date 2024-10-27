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
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	setStyleProps: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	setStyleProps,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [state, setState] = useState(defaultArticleState);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const styleStates: ArticleStateType = {
		fontFamilyOption: state.fontFamilyOption,
		fontColor: state.fontColor,
		backgroundColor: state.backgroundColor,
		contentWidth: state.contentWidth,
		fontSizeOption: state.fontSizeOption,
	};

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
						setStyleProps(styleStates);
					}}
					onReset={(e) => {
						e.preventDefault();
						setState(defaultArticleState);
						setStyleProps(defaultArticleState);
					}}>
					<Text size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOnChange('fontFamilyOption')}
						title='шрифт'
					/>
					<RadioGroup
						name='radio'
						selected={state.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleOnChange('fontSizeOption')}
						title='размер шрифта'
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						onChange={handleOnChange('fontColor')}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						onChange={handleOnChange('backgroundColor')}
						title='цвет фона'
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						onChange={handleOnChange('contentWidth')}
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
