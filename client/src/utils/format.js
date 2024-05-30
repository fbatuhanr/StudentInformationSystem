export const mysqlDate = (date = new Date()) => {
    return date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' );
}