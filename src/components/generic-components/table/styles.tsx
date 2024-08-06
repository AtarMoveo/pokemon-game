import { colors, font, tableSize, textStyle } from "../../../assets/style/setup/constants";

export const tableStyles = {
    headRow: {
        borderBottom: `1px solid ${colors.neutrals[100]}`,
        borderRadius: '4px 4px 0 0',
    },
    headCell: {
        fontFamily: font.primary.bold,
        ...textStyle.body,
        padding: 0,
        height: tableSize.header.height,
        background: colors.primary[50],
    },
    bodyCell: {
        fontFamily: font.primary.regular,
        ...textStyle.mediumHeading,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    imageCell: {
        display: 'flex',
        width: '2.75rem',
        height: '2.75rem',
        padding: '0.3125rem',
        backgroundColor: colors.primary[60],
        borderRadius: '50%',
    },
    pagination: {
        '.MuiTablePagination-toolbar': {
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr auto auto',
            justifyItems: 'start',
            alignItems: 'baseline',
            fontFamily: font.secondary.regular,
            fontSize: '0.75rem',
            lineHeight: '0.875rem',
            color: colors.neutrals[250],
        },
    },
}

export function getColumnPadding(columnId: string): string {
    return columnId === 'image' ? '0.5rem 1rem' : (
      ['name', 'id', 'description'].includes(columnId)
        ? '1rem 2.5rem 1rem 0'
        : '1rem 1rem 1rem 0')
  }