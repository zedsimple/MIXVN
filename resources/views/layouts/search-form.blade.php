{!! Form::open(['route' => 's_p', 'class' => 'search-form', 'method' => 'get'])!!}
	<div class="search-tagging">
		<div class="list-tagging-container">
				
		</div>
		<div class="input-search-container">
			{!!
				Form::text(
					'product-name',
					'',
					[
						'placeholder' => 'Nhập hoặc chọn "Từ Khóa" bên dưới để tìm sản phẩm'
					]
				)
			!!}
			{!!
				Form::submit(
					'',
					[
						'class' => 'search-icon'
					]
				)
			!!}
		</div>
	</div>
{!! Form::close() !!}
