#!/bin/bash -ue

BASE_DIR="$(cd $(dirname $0); pwd)"

OUTPUT_FILE="${BASE_DIR}/throws.ts"
MANUAL_FILE="${BASE_DIR}/throws-manual.ts"

AUTO_ERROR_LIST='
NotImplementedError,未実装
NotSupportedError,実装が存在しない
InvalidOperationError,不正処理
ArgumentError,引数異常
ElementTypeError,指定要素の型が合わない
NotFoundDomSelectorError,セレクタで要素が見つからない
'
AUTO_ERRORS=(`echo $AUTO_ERROR_LIST`)

TIMESTMAP=`date --iso-8601="seconds"`
cat <<EOS > ${OUTPUT_FILE}
// エラー系
// GEN: ${TIMESTMAP}

// 手動 ---------------------

EOS

cat ${MANUAL_FILE} >> ${OUTPUT_FILE}
echo "" >> ${OUTPUT_FILE}
echo "// 自動 ---------------------" >> ${OUTPUT_FILE}
echo "" >> ${OUTPUT_FILE}

for (( i = 0; i < ${#AUTO_ERRORS[@]}; ++i )); do
	ERROR_ITEMS=(${AUTO_ERRORS[$i]//,/ })
	ERROR=${ERROR_ITEMS[0]}
	SUBJECT=${ERROR_ITEMS[1]}
	cat << EOS >> ${OUTPUT_FILE}
/**
* ${SUBJECT}
 */
export class ${ERROR} extends Error {
	constructor(message?: string | undefined) {
		super(message);
		this.name = '${ERROR}';
	}
}

EOS
done;

