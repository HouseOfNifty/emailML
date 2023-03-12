import torch
import torch.nn as nn

class SpamModel(nn.Module):

    #Initialize the model, maybe put in more hyperparameters later
    def __init__(self, vocabLength):

        #Call the super constructor for all the nn.Module stuff
        super(SpamModel, self).__init__()

        #Define the layers

        #input layer has vocabLength nodes and 256 nodes out
        self.linear1 = nn.Linear(vocabLength, 512)

        #activation function, sigmoid seems to work better
        #self.relu = nn.ReLU()
        self.sigmoid = nn.Sigmoid()
        
        #hidden layers
        #less appears to work better in this case, generating lower losses but oddly not better accuracy sometimes
        #the best loss so far is from (vocab, 128) (128,128) (128,1) at around 0.3 after 150 epochs which yields 80% accuracy
        
        #gets a little wonky around 250 sometimes, still averaging down but can jump way back up to like 0.33


        #vocab = 10000
        #testing (vocab, 512) (512,256) (256,1) : 82% accuracy, 0.247 loss
        #testing (vocab, 512) (512,512) (512,1) : 81.96 accuracy, 0.250 loss after 100
        #testing (vocab, 512) (512,128) (128,1) : 80.96 accuracy, 0.266 loss after 200
        #testing (vocab, 512) (512, 256) (256,1) : 78 after 300, wonky loss, hit minimum of .18 but then jumped back up to .25 near the end
        #testing (vocab, 512) (512, 256) (256,1) : 85.2 accuracy after 250 epochs, 0.13 loss, used lr=0.000001 
        #testing (vocab, 512) (512, 256) (256,1) : 82.2 accuracy after 300 epochs, 0.103 loss, used lr=0.000001
        #testing (vocab, 512) (512, 256) (256,1) : 86.5 accuracy after 275 epochs, < 0.1 loss, 8000 tokens
        #testing (vocab, 512) (512, 256) (256,1) , 10000 tokens with only digits taken out : 87% accuracy after 275 epochs, 0.14 loss

        #vocab = 12000
        #testing (vocab, 512) (512, 256) (256,1) : 
        self.linear2 = nn.Linear(512, 256)
        self.linear3 = nn.Linear(256,1)
        #self.linear4 = nn.Linear(32,1)
        #self.linear5 = nn.Linear(32,1)



    #Forward pass
    #Input is a tensor of word indices
    def forward(self, x):

        #Pass the input through the layers
        x = self.linear1(x)
        x = self.sigmoid(x)
        x = self.linear2(x)
        x = self.sigmoid(x)
        x = self.linear3(x)
        x = self.sigmoid(x)
        return x

