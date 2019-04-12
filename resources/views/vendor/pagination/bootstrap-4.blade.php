@if ($paginator->hasPages())
    <div class="row m-t-10">
    <div class="col-sm-12 col-md-5">
    <div class="showing-items">
        Showing {{ $paginator->firstItem() }} to {{ $paginator->lastItem() }} of {{ $paginator->total() }} entries
    </div>
    </div>
    <div class="col-sm-12 col-md-7">
    <div class="data-table-paginate">
        <nav>
        <ul class="pagination">
        @if (! $paginator->onFirstPage())
            <li class="page-item">
            <a class="page-link"
                href="{{ $paginator->previousPageUrl() }}">Previous</a>
            </li>
        @endif
        @foreach ($elements as $element)
            @if (is_array($element))
                @foreach ($element as $page => $url)
                    @if ($page == $paginator->currentPage())
            <li class="page-item">
            <a class="page-link active">{{ $page }}</a>
            </li>
                    @else
            <li class="page-item">
            <a class="page-link"
             href="{{ $url }}">{{ $page }}</a>
            </li>
                    @endif
                @endforeach
            @endif
        @endforeach
        @if ($paginator->hasMorePages())
            <li class="page-item">
            <a class="page-link"
                href="{{ $paginator->nextPageUrl() }}">Next</a>
            </li>
        @endif
        </ul>
        </nav>
    </div>
    </div>
</div>
@endif
