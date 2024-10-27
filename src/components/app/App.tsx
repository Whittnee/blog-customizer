import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import styles from '../../styles/index.module.scss';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [styleProps, setStyleProps] = useState(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': styleProps.fontFamilyOption.value,
					'--font-size': styleProps.fontSizeOption.value,
					'--font-color': styleProps.fontColor.value,
					'--container-width': styleProps.contentWidth.value,
					'--bg-color': styleProps.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setStyleProps={setStyleProps} />
			<Article />
		</main>
	);
};
