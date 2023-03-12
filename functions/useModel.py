import sys
import torch
from SpamModel import SpamModel





def evaluate():

    number = sys.argv[1]

    vocab = torch.load('vocab' + number + '.pt')
    model = SpamModel(len(vocab))


    model.load_state_dict(torch.load('model' + number + '.pt'))

    model.eval()

    with open(sys.argv[2], 'r') as f:
        text = f.read()
        text = text.split()
        tokens = []
        for word in text:
            if word in vocab:
                tokens.append(vocab[word])
            else:
                tokens.append(vocab['<UNK>'])

        while len(tokens) < len(vocab):
            tokens.append(vocab['<PAD>'])
        tokens = torch.tensor(tokens, dtype=torch.float32)
        prediction = model(tokens)
        print(prediction)
        



if __name__ == "__main__":
    main()