import { PluginOption } from 'vite';
import { withCustomConfig } from './componentExtractor';
import { ComponentDoc } from 'react-docgen-typescript';

interface DocgenPluginOptions {
	tsconfigPath?: string;
}

const DEFAULT_TSCONFIG_PATH = './tsconfig.json';

const kombaiPlugin = ({ tsconfigPath = DEFAULT_TSCONFIG_PATH }: DocgenPluginOptions = {}): PluginOption => {
	const componentsDocs: ComponentDoc[] = [];

	return {
		name: 'kombai-plugin',
		buildStart() {
			if (tsconfigPath === DEFAULT_TSCONFIG_PATH) {
				this.warn(`tsconfigPath is not provided, using default tsconfig.json`);
			}
		},
		transform(code, id) {
			if (id.endsWith('.tsx')) {
				const parser = withCustomConfig(tsconfigPath, {
					shouldExtractLiteralValuesFromEnum: true,
					propFilter: (prop) => {
						return true;
					},
				});
				componentsDocs.push(...parser.parse(id));
			}
			return {
				code,
			};
		},

		generateBundle(options, bundle) {
			if (componentsDocs.length > 0) {
				bundle['componentInfo.json'] = {
					fileName: 'componentInfo.json',
					isAsset: true,
					source: JSON.stringify(componentsDocs, null, 2),
					name: 'componentInfo.json',
					type: 'asset',
				};
			}
		},
	};
};

export default kombaiPlugin;
