import { Component } from 'react';
import { GlobalStyle } from '../../GlobalStyle';
import { fetchImages } from 'components/services/api';

import { AppThumb } from './App.Styled';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ loading: true });
      fetchImages(this.state.query, this.state.page)
        .then(data => {
          this.setState({ images: data.hits });
        })
        .finally(() => this.setState({ loading: false }));
    } else if (prevState.page !== this.state.page) {
      this.setState({ loading: true });

      fetchImages(this.state.query, this.state.page)
        .then(data => {
          this.setState({
            images: [...prevState.images, ...data.hits],
          });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = sumbittedQuery => {
    this.setState({ query: sumbittedQuery, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {

    return (
      <AppThumb>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery images={this.state.images} />

        {this.state.loading && <Loader />}

        {this.state.images.length > 11 && (
          <Button onLoadClick={this.loadMore}>LOAD MORE</Button>
        )}

        <GlobalStyle />
      </AppThumb>
    );
  }
}
