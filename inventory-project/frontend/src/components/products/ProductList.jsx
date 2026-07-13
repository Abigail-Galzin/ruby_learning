export const ProductList = ({products, onRefresh}) => {
    return (
        <div>
            <ul>
                {products?.map(element => {
                    <li>{element.name}</li>
                })}
            </ul>
        </div>
    )
}
