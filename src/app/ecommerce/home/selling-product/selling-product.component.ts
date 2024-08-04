import { Component, EventEmitter, Output } from '@angular/core';
import { ItemProductResponse } from '../../../models/responses/product/item-product-response';
import { ProductService } from '../../../services/product/product.service';
import { FileService } from 'src/app/services/file/file.service';
import { UtilMoney } from 'src/app/helpers/utils/util-money';
import { CartService } from 'src/app/services/cart/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'ngx-selling-product',
  templateUrl: './selling-product.component.html',
  styleUrls: ['./selling-product.component.scss'],
})
export class SellingProductComponent {
  // variables
  itemProductResponses: ItemProductResponse[] = [];
  @Output() childOnClickBuy = new EventEmitter<ItemProductResponse>();
  @Output() childOnClickDetails = new EventEmitter<ItemProductResponse>();

  // constructor
  constructor(
    private productService: ProductService,
    public fileService: FileService,
    public utilMoney: UtilMoney
  ) {}

  // InitData
  ngOnInit() {
    this.loadItemProduct();
  }

  // Load Item Product
  loadItemProduct() {
    this.productService.getSellingProductByMonth().subscribe((res) => {
      if (res.code === 200) {
        this.itemProductResponses = res.obj as ItemProductResponse[];
      }
    });
  }

  // Xử lý khi bấm nút mua
  triggerParentOnClickBuy(item: ItemProductResponse) {
    this.childOnClickBuy.emit(item);
  }

  // Xử lý khi chi tiết
  triggerParentOnClickDetails(item: ItemProductResponse) {
    this.childOnClickDetails.emit(item);
  }
  // Xử lý khi chọn đơn vị sản phẩm
  onUnitChange(item: ItemProductResponse, unitId: string) {
    item.unitId = unitId;
  }
}
